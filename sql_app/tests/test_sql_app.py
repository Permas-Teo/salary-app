from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..database import Base
from ..main import app, get_db
from .data.test_data import SAMPLE_VALID_DATA

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_user():
    response = client.post(
        "/users/",
        json=SAMPLE_VALID_DATA,
    )
    assert response.status_code == 200, response.text
    data = response.json()

    assert "id" in data
    assert data["id"] == SAMPLE_VALID_DATA["id"]

    assert "login" in data
    assert data["login"] == SAMPLE_VALID_DATA["login"]

    assert "name" in data
    assert data["name"] == SAMPLE_VALID_DATA["name"]

    assert "salary" in data
    assert data["salary"] == SAMPLE_VALID_DATA["salary"]

def test_read_users_basic():
    response = client.get("/users/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0] == SAMPLE_VALID_DATA

def test_read_user():
    test_user_id = SAMPLE_VALID_DATA["id"]
    response = client.get(f"/users/{test_user_id}")
    assert response.status_code == 200

    data = response.json()
    assert data == SAMPLE_VALID_DATA
