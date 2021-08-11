from typing import Optional, List
from fastapi import Depends, FastAPI, HTTPException, File, UploadFile
from sqlalchemy.orm import Session

import pandas as pd
from io import StringIO

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Utility
def filterDf(df):
    return df[~df['id'].str.contains("#")] 

# id and login must be unique. They cannot be repeated in another row 
# => Assume invalid if ANY id or login is found duplicate in csv
def validateCSV(df):
    noDuplicatesId = {}
    noDuplicatesLogin = {}
    for index, row in df.iterrows():
        currId = row["id"]
        currLogin = row["login"]
        currName = row["name"]
        currSalary = row["salary"]

        # Check all values not NAN
        if (pd.isna(currId) or pd.isna(currLogin) or pd.isna(currName) or pd.isna(currSalary)):
            return False

        # Check salary is numeric and >= 0
        if type(currSalary) == int or type(currSalary) == float:
            if currSalary < 0:
                return False
        else:
            return False
        
        # Check duplicates for id
        if currId not in noDuplicatesId:
            noDuplicatesId[currId] = True
        else:
            return False
        
        # Check duplicates for login
        if currLogin not in noDuplicatesLogin:
            noDuplicatesLogin[currLogin] = True
        else:
            return False

    return True


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user.id)
    if db_user:
        return crud.update_user(db=db, user=user)
        # raise HTTPException(status_code=400, detail="Id already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/upload")
def create_upload_file(file: UploadFile = File(...)):
    df = pd.read_csv(StringIO(str(file.file.read(), 'utf-8')), encoding='utf-8')
    
    df = filterDf(df)
    if (not validateCSV(df)):
        raise HTTPException(status_code=422, detail="Data validation failed")

    # updateDb(df)
    
    return {"filename": file.filename}