# About the project

This project is a full-stack portal for predicting stock prices using the <a href="finance.yahoo.com">Yahoo Finance</a>'s stocks data.

The portal involves React and React Router as frontend library and router, whilst the backend's requests are handled by a Django and it's REST framework (DRF). Moreover the prediction is done by a LSTM model, which is prepared & trained in Python by using Numpy, Pandas, and Tensorflow/Keras, and Matplotlib for visualization.

Also needs to be mentioned that this project is inspired by Udemy's <a href="https://www.udemy.com/course/full-stack-machine-learning-django-rest-framework-react/">Full Stack Machine Learning Course</a> Project.

# Getting Started

1. Clone the repository to your machine by command:

    `git clone https://github.com/Alireza3044/stock-prediction-portal.git`

2. Install the requirements.py for backend and ML:

    `pip install requirements.txt`

3. Move to the `backend-drf` directory and create a `.env` file. Inside the file you should provide two keys: `DEBUG` and `SECRET_KEY`. `DEBUG` should be `False` if the project is on deployment, otherwise `True`. For generating a secure secret key you could use an online tool or from `django.core.management.utils` import `get_random_secret_key` and run the function and put the result in `.env` file

4. Move to `frontend-react` directory and run `npm i` to install the required packages by npm. Then you need to create a `.env` file and provide the `VITE_BACKEND_ROOT_URL` and `VITE_BACKEND_API_URL` variables.

5. Now you can run the frontend server by `npm run dev` and run the backend server by moving to `backend-drf` directory and running `python manage.py runserver`.

6. Optionally you can go inside the `ML` directory and work on the prediction model. Don't forget to move the prediction model into `django-drf`, otherwise the server could not be able to access the model.
