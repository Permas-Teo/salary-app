from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel, ValidationError, validator

app = FastAPI()

class User(BaseModel):
    id: str
    login: str
    name: str
    salary: float

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


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users/{user_id}")
def read_user(user_id: int, q: Optional[str] = None):
    return {"user_id": user_id, "q": q}

@app.put("/users/{user_id}")
def update_user(user_id: int, user: User):
    return {"user_name": user.name, "user_id": user_id}
