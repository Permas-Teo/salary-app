from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select
import pandas as pd


from . import models, schemas


def get_user_by_id(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.User):
    db_user = models.User(id=user.id, login=user.login, name=user.name, salary=user.salary)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: schemas.User):
    db_user = models.User(id=user.id, login=user.login, name=user.name, salary=user.salary)
    db.query(models.User).filter(models.User.id == user.id).update({
        models.User.login: user.login,
        models.User.name: user.name,
        models.User.salary: user.salary
    }, synchronize_session = False)
    db.commit()
    return db_user

def updateDb(db: Session, df):
    for index, row in df.iterrows():
        db_user = models.User(id=row["id"], login=row["login"], name=row["name"], salary=row["salary"])

        dup_db_user = get_user_by_id(db, db_user.id)
        if dup_db_user:
            db.query(models.User).filter(models.User.id == db_user.id).update({
                models.User.login: db_user.login,
                models.User.name: db_user.name,
                models.User.salary: db_user.salary
            }, synchronize_session = False)
        else:
            db.add(db_user)

    db.commit()

    




    
