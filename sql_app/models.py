from sqlalchemy import Column, Float, String
from sqlalchemy import CheckConstraint
# from sqlalchemy.orm import relationship

from .database import Base

class User(Base):

    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    login = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    salary = Column(Float, nullable=False)

    __table_args__ = (
        CheckConstraint(salary >= 0),
    )

