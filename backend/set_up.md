pip install virtualenv

virtualenv env

source env/Scripts/activate

pip install flask flask-sqlalchemy


#can be use too instead of virtualenv env
python -m venv env

----------------------------------------------------------------
POSTGRES SET UP(cmd or terminal)

psql -U YOUR_USERNAME
then enter your password

CREATE ROLE team_mang SUPERUSER LOGIN PASSWORD 'admin';

CREATE DATABASE user_info OWNER team_mang; 


