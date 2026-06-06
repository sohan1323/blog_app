#!/usr/bin/env bash
# exit on error
set -o errexit

# Change to the directory where the script is located
cd "$(dirname "$0")"

pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
