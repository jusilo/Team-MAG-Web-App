pip install virtualenv

virtualenv env

source env/Scripts/activate

pip install flask flask-sqlalchemy


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

#for hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;


#create a function for hashing
#dont replace salt!!!!!!
CREATE or replace FUNCTION hash_password_before_insert()
RETURNS TRIGGER AS $$
BEGIN
    NEW.password := crypt(NEW.password, gen_salt('md5'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


#create a trigger to hash password every time we insert a new password
CREATE TRIGGER hash_password_trigger
BEFORE INSERT ON user_info
FOR EACH ROW
EXECUTE FUNCTION hash_password_before_insert();

#test query for password hashing
INSERT INTO public.user_info (first_name, last_name, age, email, "password")
VALUES ('fname', 'lname', 25, 'fname.lname@example.com', 'mypassword');

#create a second table 
CREATE TABLE public."event" (
	event_id varchar NOT NULL,
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
