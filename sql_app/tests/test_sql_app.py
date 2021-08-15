from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest
import os

from ..database import Base
from ..main import app, get_db
from .data.test_data import SAMPLE_VALID_DATA_1, SAMPLE_VALID_DATA_2, SAMPLE_VALID_DATA_3, SAMPLE_VALID_USERBASE_DATA_1

TEST_DB="./test.db"
SQLALCHEMY_DATABASE_URL = "sqlite:///" + TEST_DB

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="session", autouse=True)
def cleanup(request):
    def remove_test_dir():
        os.remove("./test.db") 
    request.addfinalizer(remove_test_dir)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_post_user():
    response = client.post(
        "/users/" + SAMPLE_VALID_DATA_1["id"],
        json=SAMPLE_VALID_DATA_1,
    )
    assert response.status_code == 200, response.text
    data = response.json()

    assert "id" in data
    assert data["id"] == SAMPLE_VALID_DATA_1["id"]

    assert "login" in data
    assert data["login"] == SAMPLE_VALID_DATA_1["login"]

    assert "name" in data
    assert data["name"] == SAMPLE_VALID_DATA_1["name"]

    assert "salary" in data
    assert data["salary"] == SAMPLE_VALID_DATA_1["salary"]

def test_read_user_success():
    test_user_id = SAMPLE_VALID_DATA_1["id"]
    response = client.get(f"/users/{test_user_id}")
    assert response.status_code == 200

    data = response.json()
    assert data == SAMPLE_VALID_DATA_1

def test_patch_user_success():
    test_user_id = SAMPLE_VALID_DATA_1["id"]

    response = client.patch(
        "/users/" + test_user_id,
        json=SAMPLE_VALID_USERBASE_DATA_1,
    )
    assert response.status_code == 200
    data = response.json()

    assert data["login"] == SAMPLE_VALID_USERBASE_DATA_1["login"]
    assert data["name"] == SAMPLE_VALID_USERBASE_DATA_1["name"]
    assert data["salary"] == SAMPLE_VALID_USERBASE_DATA_1["salary"]

def test_delete_user_success():
    test_user_id = SAMPLE_VALID_DATA_1["id"]
    response = client.delete(f"/users/{test_user_id}")
    assert response.status_code == 200

    # User not found any more after delete
    response = client.get(f"/users/{test_user_id}")
    assert response.status_code == 404

def test_delete_user_fail():
    test_user_id = SAMPLE_VALID_DATA_1["id"]
    response = client.delete(f"/users/{test_user_id}")
    assert response.status_code == 404

def test_read_user_fail():
    test_user_id = SAMPLE_VALID_DATA_1["id"]
    response = client.get(f"/users/{test_user_id}")
    assert response.status_code == 404

def test_read_users():
    client.put(
        "/users/",
        json=SAMPLE_VALID_DATA_2,
    )
    client.put(
        "/users/",
        json=SAMPLE_VALID_DATA_3,
    )

    response = client.get("/users/?minSalary=0&maxSalary=100001&limit=1&offset=0&sort=-salary")
    data = response.json()["results"]
    assert len(data) == 1
    assert data[0] == SAMPLE_VALID_DATA_3

    response = client.get("/users/?minSalary=0&maxSalary=100001&limit=1&offset=1&sort=-id")
    data = response.json()["results"]
    assert len(data) == 1
    assert data[0] == SAMPLE_VALID_DATA_2

    # Missing fields
    response = client.get("/users/?minSalary=100&maxSalary=100001&limit=1&sort=-salary")
    assert response.status_code == 422

def test_post_upload_file_success():
    fpath = './sql_app/tests/data/valid.csv'
    with open(fpath, "rb") as f:
        response = client.post("/users/upload/", files={"file": f})
        assert response.status_code == 200

def test_post_upload_file_fail():
    fpath = './sql_app/tests/data/empty_file.csv'
    with open(fpath, "rb") as f:
        response = client.post("/users/upload/", files={"file": f})
        assert response.status_code == 400

    fpath = './sql_app/tests/data/salary_negative.csv'
    with open(fpath, "rb") as f:
        response = client.post("/users/upload/", files={"file": f})
        assert response.status_code == 422
    
    fpath = './sql_app/tests/data/salary_not_number.csv'
    with open(fpath, "rb") as f:
        response = client.post("/users/upload/", files={"file": f})
        assert response.status_code == 422
    
    fpath = './sql_app/tests/data/too_little_rows.csv'
    with open(fpath, "rb") as f:
        response = client.post("/users/upload/", files={"file": f})
        assert response.status_code == 422

    fpath = './sql_app/tests/data/too_many_rows.csv'
    with open(fpath, "rb") as f:
        response = client.post("/users/upload/", files={"file": f})
        assert response.status_code == 422