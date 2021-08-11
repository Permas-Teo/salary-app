from typing import Optional

from pydantic import BaseModel, ValidationError, validator

class User(BaseModel):
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