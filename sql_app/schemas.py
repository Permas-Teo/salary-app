from typing import Optional

from pydantic import BaseModel, ValidationError, validator

class UserBase(BaseModel):
    login: Optional[str] = None
    name: Optional[str] = None
    salary: Optional[float] = 0.0

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


# try:
#     User(
#         id='samuel',
#         login='scolvin',
#         name=12,
#         salary="-111.0",
        
#     )
# except ValidationError as e:
#     print(e)