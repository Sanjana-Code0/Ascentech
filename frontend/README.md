# Ascentech Hall Booking Data Entry System

This project is a full-stack web application designed to fulfill the requirements of the Ascentech intern interview exercise. It provides a system for managing hall bookings with full CRUD (Create, Read, Update, Delete) functionality.

## Technologies Used

*   **Frontend:** React.js
*   **Backend:** Python (Django) with Django REST Framework (DRF)
*   **Database:** PostgreSQL (PgSQL)
*   **Data Handling:** Django ORM for all database operations.

## Features

1.  **Display Bookings:** Shows a list of all existing hall bookings (Read).
2.  **Accept Booking:** Allows data entry for new hall bookings (Create).
3.  **Update/Delete:** Provides functionality to modify or remove existing bookings (Update/Delete).

## Setup and Running Instructions

### Prerequisites

1.  **Python 3.10+**
2.  **Node.js (LTS)**
3.  **PostgreSQL (PgSQL) Database Instance** (Self-hosted local or VM instance).
4.  **Git & GitHub**

### 1. Database Setup

First, ensure your PostgreSQL server is running. Create a new database named `asc_hall_db`.

### 2. Backend Setup (Django)

1.  Navigate to the `backend/` directory.
    ```bash
    cd backend
    ```

2.  **Configuration:** Create a file named `.env` in the `backend/` directory by copying the contents of the main `.env.example` file.
    **CRITICAL:** Replace the fake `DB_...` and `SECRET_KEY` values in your new `.env` file with the actual credentials for your PostgreSQL instance. *Note: This `.env` file is excluded via `.gitignore` to satisfy the security requirement.*

3.  **Virtual Environment & Install Dependencies:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use: .\venv\Scripts\activate
    pip install -r requirements.txt
    ```

4.  **Run Migrations:** Apply the initial database schema using the Django ORM.
    ```bash
    python manage.py makemigrations bookings
    python manage.py migrate
    ```

5.  **Start Backend Server:**
    ```bash
    python manage.py runserver
    ```
    The API should now be running at `http://127.0.0.1:8000/`.

### 3. Frontend Setup (React)

1.  Open a new terminal and navigate to the `frontend/` directory.
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
    ```
    The React application should open automatically in your browser (usually at `http://localhost:3000`).

## Project Execution & Architecture Notes

### ORM Usage

All database interactions (CRUD) are performed exclusively through the Django ORM (`models.py`) and exposed via the Django REST Framework `ViewSet` in `views.py`. The `BookingViewSet` automatically handles listing, creation (POST), retrieval, updating (PUT/PATCH), and deletion (DELETE) endpoints, ensuring that no raw SQL is used.

### Configuration Management

As per the requirements, no server URLs, credentials, or database information are hardcoded in the source code or checked into the repository. They are dynamically loaded via the `python-decouple` library in `backend/hallbooking/settings.py` from OS environment variables or a local `.env` file, ensuring security and portability.