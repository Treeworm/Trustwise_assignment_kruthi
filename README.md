
# TRUSTWISE ASSIGNMENT

## Objective:
The goal of this project is to design and deploy a REST API that processes a given text which could be an output from a Large Language Model (LLM), evaluates it using machine learning models, and returns a score based on predefined criteria. Additionally, all received texts and their corresponding scores are logged into a database and displayed through a user-friendly interface.

## Tech Stack Used:
- **Backend:** Flask (Python)
- **Frontend:** React.js and Tailwind CSS
- **Database:** MongoDB
- **Graphs:** Chart.js
- **Containerization:** Docker

## UI Design:
### 1. Home Page:
The home page allows users to enter text for analysis. Once the text is submitted, the backend processes it and returns a score, which is displayed on the same page.

### 2. Analyze Page:
This page has two sections:
- **Analysis Trends:** A graphical representation of the scoring trends.
- **Analysis History:** Lists past analyses, showing previously processed texts and their scores. Users can also search history using a search filter and a date filter.

## Repository Structure:
```
Kruthi_trustwise_assignment/
|------backend/
|                |----models/
|                |----app.py
|                |----config.py
|                |----database.py
|                |----Dockerfile
|                |…
|------frontend/
|                |----src/
|                |----Dockerfile
|                |----nginx.conf
|                |…
|------docker-compose.yml
|------README.md
```

## To Run the Repo:
1. Download the zip file, extract it, and run the following commands:
2. Activate the virtual environment in the backend and run it:
    ```sh
    venv/Scripts/activate
    python app.py
    ```
3. Run the frontend code using:
    ```sh
    npm start
    ```

## Backend Implementation:
Navigate to the backend folder:
```sh
cd backend
```
### Setup and Dependencies:
Create a virtual environment:
```sh
python3 -m venv venv
```
Activate the virtual environment:
```sh
venv\Scripts\activate
```
Install dependencies:
```sh
pip install flask flask-cors pymongo transformers torch python-dotenv
```
- **flask:** Web framework for building APIs.
- **flask-cors:** Enables CORS for frontend-backend communication.
- **pymongo:** Connects with MongoDB.
- **transformers:** Provides pre-trained NLP models.
- **torch:** Deep learning framework.
- **python-dotenv:** Manages environment variables.

Run the backend server:
```sh
python app.py
```

### Backend File Structure:
```
models/
       |----__init__.py
       |----toxicity.py
       |----vectara.py
```
- **toxicity.py** and **vectara.py**: Load Hugging Face models and compute toxicity and vectara scores, respectively.
- **backend/.env**: Stores environment variables.
- **backend/config.py**: Manages configuration values like MongoDB connection settings.
- **backend/database.py**: Handles insertion and retrieval of documents.
- **backend/app.py**: Initializes models and the database, implements `/analyze` and `/history` API endpoints, and stores responses in the database.

### API Testing:
Download **Postman** to test API endpoints:
- **Analyze Endpoint:** `http://localhost:5000/api/analyze`
- **History Endpoint:** `http://localhost:5000/api/history`

Stored responses can be viewed in MongoDB.

## Frontend Implementation:
Create a basic React app:
```sh
npx create-react-app .
```

### Frontend File Structure:
```
src/
  |----components/
                  |-----Footer.js
                  |-----Navbar.js
  |----pages/
                 |----AnalyzePage.js
                 |----LandingPage.js
  |----App.js
  |----index.js
  …
```
- **Footer.js:** Implements the footer section.
- **Navbar.js:** Implements the navigation bar.
- **LandingPage.js:** Implements the home page where input text is taken and a score is given.
- **AnalyzePage.js:** Implements graphical representations of scoring trends and analysis history.
- **App.js:** Sets up app structure and handles routing using React Router.

## Docker for Containerization:
1. Download **Docker Desktop** and create a **Dockerfile** in both frontend and backend folders.
2. Build and run the Docker containers using:
   ```sh
   docker-compose up --build
   
