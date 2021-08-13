# salary-app

## Backend

#### Initialise python virtual environment

In the repository root folder, create a python venv:

`python -m venv venv`

To activate the virtual environment (Linux):

`source venv/bin/activate`

To activate the virtual environment (Windows):

`venv\Scripts\activate`

In virtual environment `(venv)`, install dependencies with:

`pip install -r requirements.txt`

#### Run python backend server

In virtual environment `(venv)`, to run python backend server:

`uvicorn sql_app.main:app --reload`

#### Run tests

In virtual environment `(venv)`, to run tests:

`pytest`

## Frontend

#### Install dependencies

In the **salary-app/frontend** folder, install dependencies:

`npm install`

#### Run React webapp

In the **salary-app/frontend** folder, to run React webapp:

`npm start`

#### Run tests

In the **salary-app/frontend** folder, to run tests:

`npm test`
