## This is a restaurant management project that using NextJS in Front-end and Django Rest Framework (DRF) in back-end
### Installation
Step 1: Create virtual environment
```bash
cd .\backend\RestaurantCore\
```
```bash
pip install virtualenv
```
```bash
virtualenv env
```
Step 2: Init virtual environment
```bash
.\env\Scripts\activate
```
Step 3: Install requirements
```bash
pip install -r .\requirements.txt
```
Step 4: Make migrations to database (I'm using sqlite by default)
```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```
### Run back-end server
- Back-end local in port 8000
```bash
python manage.py runserver
```
### Run front-end
Step 1: Direct to folder
```bash
cd .\frontend\nextjs-frontend\
```
Step 2: Install necessary module
```bash
npm i
```
Step 3: Run
```bash
npm run dev
```

