# Team-MAG-Web-App
pip install virtualenv

virtualenv env

source env/Scripts/activate

pip install flask flask_sqlalchemy psycopg2 werkzeug


#can be use too instead of virtualenv env
python -m venv env

----------------------------------------------------------------
POSTGRES SET UP(cmd or terminal)

psql -U YOUR_USERNAME
#then enter your password

CREATE ROLE team_mang SUPERUSER CREATEDB CREATEROLE REPLICATION BYPASSRLS LOGIN PASSWORD 'admin';

