# Ascentech Hall Booking Data Entry System

This project is a full-stack web application developed to fulfill the requirements of the Ascentech intern interview exercise. It implements a basic CRUD (Create, Read, Update, Delete) system for managing hall bookings.

## Deliverables Status

| Objective | Status | Notes |
| :--- | :--- | :--- |
| **1. Install PgSQL Database** | Required for Execution | Local or cloud PostgreSQL instance is needed to run the backend. |
| **2. Design and develop basic data entry website (CRUD)** | **COMPLETE** | Frontend (React) and Backend (Django/DRF) implemented. |
| **3. Create a repository in GitHub** | **COMPLETE** | Repository initialized and files pushed. |
| **4. Merge your project** | **COMPLETE** | All code is committed to the `main` branch. |
| **5. Add a Loom video** | **PENDING** | **[INSERT YOUR LOOM VIDEO LINK HERE]** |
| **6. Add a readme file with instructions** | **COMPLETE** | This document fulfills the requirement. |

## Technologies Used

*   **Frontend:** React.js
*   **Backend:** Python (Django) with Django REST Framework (DRF)
*   **Database:** PostgreSQL (PgSQL)
*   **Data Handling:** Django ORM is used exclusively for all CRUD operations.
*   **Configuration:** `python-decouple` to read environment variables.

---

## Setup and Running Instructions

### Prerequisites

You must have the following installed on your machine:
1.  **Python 3.10+**
2.  **Node.js (LTS)** and **npm** or **yarn**
3.  **PostgreSQL (PgSQL) Database Instance** (Running locally or on a VM).
4.  **Git**

### 1. Database Setup & Backend Configuration

1.  **Install PgSQL:** Ensure your PostgreSQL server is running. Create a new database (e.g., `asc_hall_db`).
2.  **Configuration File:** Navigate to the `backend/` directory and create a file named **`.env`** (by copying the contents of `.env.example`).
3.  **Set Credentials:** Edit the newly created `backend/.env` file and replace the placeholder `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `SECRET_KEY` values with your actual PostgreSQL credentials. **This is critical to meet the non-hardcoding requirement.**

### 2. Backend Setup (Django)

1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```

2.  **Virtual Environment & Dependencies:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Use .\venv\Scripts\activate on Windows PowerShell
    pip install -r requirements.txt
    ```

3.  **Run Migrations (ORM to DB Schema):**
    ```bash
    python manage.py makemigrations bookings
    python manage.py migrate
    ```

4.  **Start Backend Server:**
    ```bash
    python manage.py runserver
    # The API will run at http://127.0.0.1:8000/api/bookings/
    ```

### 3. Frontend Setup (React)

1.  Open a **new terminal** and navigate to the `frontend/` directory:
    ```bash
    cd ../frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start Frontend Server:**
    ```bash
    npm start
    # The application will open in your browser (usually at http://localhost:3000)
    ```

## Architecture Notes

### Security and Configuration
All sensitive parameters (database credentials, secret keys) are read from the environment (`.env` file) using the `python-decouple` library and are never hardcoded in the source files, complying with instruction **#6**. The `.gitignore` file ensures the local `.env` file is never committed to the repository.

### ORM Usage
All data manipulation (CRUD operations) for the Hall Booking model are handled through Django's native ORM and exposed via the Django REST Framework's `ModelViewSet`, strictly adhering to instruction **#5** (All Crud operations to be performed through ORM).
