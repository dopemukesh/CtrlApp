# CtrlApp
The Ctrl App (hereafter referred to as "Ctrl") is a groundbreaking healthcare platform designed to revolutionize healthcare access and delivery throughout Africa. Ctrl is envisioned as a comprehensive and user-centric application that seamlessly combines innovative technology with healthcare services, addressing the critical challenges faced by the African healthcare sector.


## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:

- [Python](https://www.python.org/) (for Django)
- [Node.js](https://nodejs.org/) (for React Native)
- [PostgreSQL](https://www.postgresql.org/) (or any other database of your choice)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (for React Native development)



### Django Backend

1. Clone the repository:

   ```
    git clone https://github.com/ctrlapp/ctrl.git

   ```

2. Navigate to the Django backend folder:

    ```
        cd backend
    ```
3. Create a virtual environment
    ```
        python3 -m venv env
    ```
4. Activate the virtual env with the following
    ```
        source env/bin/activate
    ```
5. Install the application dependencies
    ```
        pip install -r requirements.txt
    ```
6. Run A database migration to create the tables and a light weight sqlite3 database
    ```
        python manage.py makemigrations
        python manage.py migrate
    ```
7. Run the server
    ```
        python manage.py runserver
    ```


### React Native Frontend

1. Navigate to the frontend directory

    ```
        cd frontend
    ```
2. Install dependencies
    ```
        npm install
    ```
3. Start the development server
    ```
        npm run start:tunnel
    ```
4. The expo code will appear that you need to scan for the application to install on your phone
