from sqlalchemy import Column, Float, String
# from sqlalchemy.orm import relationship

from .database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    login = Column(String, unique=True, index=True)
    name = Column(String)
    salary = Column(Float)

