# salary-app

## Initialise python virtual environment

In the repository root folder, create a python venv:

`python -m venv venv`

To activate the virtual environment (Linux):

`source venv/bin/activate`

To activate the virtual environment (Windows):

`venv\Scripts\activate`

In virtual environment `(venv)`, install dependencies with:

`pip install -r requirements.txt`

## Run python backend server

In virtual environment `(venv)`, to run python backend server:

`uvicorn sql_app.main:app --reload`

## Run tests

In virtual environment `(venv)`, to run tests:

`pytest`
