from typing import Optional, List
from fastapi import Depends, FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import exc
from pandas.errors import EmptyDataError, ParserError

import pandas as pd
from io import StringIO

from . import crud, models, schemas, utils
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Middleware

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# api

@app.get("/")
def read_root():
    return {"Welcome to salary-app sql server!"}

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user.id)
    if db_user:
        return crud.update_user(db=db, user=user)
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/upload")
def create_upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        df = pd.read_csv(StringIO(str(file.file.read(), 'utf-8')), encoding='utf-8')
    except EmptyDataError:
        raise HTTPException(status_code=400, detail="Empty file detected")
    except ParserError:
        raise HTTPException(status_code=422, detail="Error tokenizing csv data.")

    df = utils.filterDf(df)

    res = utils.validateCSV(df)
    if res:
        raise HTTPException(status_code=422, detail=res)

    try:
        crud.updateDb(db, df)
        return {"detail":"Success"}
    except exc.IntegrityError:
        db.rollback()
        raise HTTPException(status_code=422, detail="Database integrity validation failed")
