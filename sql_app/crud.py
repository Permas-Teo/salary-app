from sqlalchemy.orm import Session
from sqlalchemy import and_
from sqlalchemy import desc, asc
from . import models, schemas
from fastapi.encoders import jsonable_encoder
from math import ceil


def isIdDifferent(id, user):
    user_data = jsonable_encoder(user)
    return id != user_data["id"]


def get_user_by_id(db: Session, id: str):
    return db.query(models.User).filter(models.User.id == id).first()


def get_users(db: Session, 
            offset: int, 
            limit: int, 
            minSalary: float, 
            maxSalary: float, 
            sort: str):

    query = db.query(models.User).filter(
        and_(
            models.User.salary >= minSalary,
            models.User.salary <= maxSalary)
        )

    # Count total pages before cutting results
    queryLength = (query.count())
    totalPages = queryLength//limit + ceil((queryLength % limit) / limit)

    if (sort != "default"):
        sortDirection = sort[0]
        sortField = sort[1:]
        if sortDirection == "-":
            query = query.order_by(desc(sortField))
        else:
            query = query.order_by(asc(sortField))   

    res = query.limit(limit).offset(offset).all()    

    return {"results" : res,
            "totalPages" : totalPages}


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


def delete_user(db: Session, id):
    db_user = db.query(models.User).filter(models.User.id==id).first()
    db.delete(db_user)
    db.commit()


def patch_user(db: Session, id, userBase: schemas.UserBase):
    db_user = db.query(models.User).filter(models.User.id==id).first()
    userBase_data = jsonable_encoder(userBase)
    stored_user_data = jsonable_encoder(db_user)

    # edge case: salary = 0 not updated
    def calcSalary():
        curr = userBase_data["salary"]
        if type(curr) == int or type(curr) == float:
            return curr
        return stored_user_data["salary"]

    updated_user_data = {
        "login": userBase_data["login"] or stored_user_data["login"],
        "name": userBase_data["name"] or stored_user_data["name"],
        "salary": calcSalary(),
    }
    db.query(models.User).filter(models.User.id == id).update({
        models.User.login: updated_user_data["login"],
        models.User.name: updated_user_data["name"],
        models.User.salary: updated_user_data["salary"]
    }, synchronize_session = False)
    db.commit()


def updateDb(db: Session, df):
    for index, row in df.iterrows():
        db_user = models.User(id=row.iloc[0], login=row.iloc[1], name=row.iloc[2], salary=row.iloc[3])
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

    




    
