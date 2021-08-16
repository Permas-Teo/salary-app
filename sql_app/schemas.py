from typing import Optional

from pydantic import BaseModel, validator

class UserBase(BaseModel):
    login: Optional[str] = None
    name: Optional[str] = None
    salary: Optional[float] = None

    @validator('salary')
    def salary_positive(cls, v):
        assert v >= 0, 'must be a positive number'
        return v

class User(UserBase):
    id: str
    login: str
    name: str
    salary: float

    class Config:
        orm_mode = True

    @validator('salary')
    def salary_positive(cls, v):
        assert v >= 0, 'must be a positive number'
        return v