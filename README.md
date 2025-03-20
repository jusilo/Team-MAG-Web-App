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


CREATE DATABASE event_app OWNER team_mang; 

#to check if the event app is created successfully
\l

#to quit
\q

#log in with team_mang and db event_app
psql -U team_mang -d event_app
password : admin

\c event_app

CREATE TABLE public.user_info (
    uid SERIAL NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    age INT CHECK (age >= 0), 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    CONSTRAINT newtable_pk PRIMARY KEY (uid)
);


#test query for inserting values
INSERT INTO public.user_info (first_name, last_name, age, email, "password")
VALUES ('fname', 'lname', 25, 'fname.lname@example.com', 'mypassword');

#create a second table 
CREATE TABLE public."event" (
	event_id SERIAL NOT NULL,
	event_name varchar NULL,
	event_creator varchar NULL,
	event_description text NULL,
	"location" varchar NULL,
	event_day date NULL,
	date_created timestamp NULL,
	last_updated timestamp NULL,
	event_attendees int[],
	uid int not null,
	CONSTRAINT event_pk PRIMARY KEY (event_id),
	constraint event_creator_fk foreign key (uid) references public."user_info"(uid)
	
);

CREATE TABLE public.event_album (
    album_id serial4 NOT NULL,
    event_id int NOT NULL,
    event_images bytea[] NULL, 
    CONSTRAINT event_album_pk PRIMARY KEY (album_id),
    CONSTRAINT event_id_creator FOREIGN KEY (event_id) REFERENCES public."event"(event_id)
);
