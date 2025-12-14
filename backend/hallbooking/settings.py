import os
from decouple import config

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
# Reads SECRET_KEY from environment variables
SECRET_KEY = config('SECRET_KEY', default='FAKE_DJANGO_SECRET_KEY_FOR_ASCENTECH_TESTING')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',  # Required for React integration
    'bookings',     # Our custom app
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # CORS middleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'hallbooking.urls'

# Database
# Configuration read from environment variables to satisfy instruction 6
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', 'fake_hallbooking_db'),
        'USER': config('DB_USER', 'fake_postgres_user'),
        'PASSWORD': config('DB_PASSWORD', 'fake_db_password'),
        'HOST': config('DB_HOST', 'fake.db.host.com'),
        'PORT': config('DB_PORT', '5432'),
    }
}

# CORS Settings (Allow React development server)
CORS_ALLOW_ALL_ORIGINS = True

# ... (rest of settings.py boilerplate)