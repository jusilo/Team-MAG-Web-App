from app import db
from sqlalchemy.dialects.postgresql import ARRAY

class User(db.Model):
    __tablename__ = 'user_info'
    uid = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

class Event(db.Model):
    __tablename__ = 'event'
    event_id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=True)
    event_creator = db.Column(db.String(100), nullable=True)
    event_description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(100), nullable=True)
    event_day = db.Column(db.Date, nullable=True)
    date_created = db.Column(db.DateTime, nullable=True)
    last_updated = db.Column(db.DateTime, nullable=True)
    event_attendees = db.Column(ARRAY(db.Integer), nullable=True)
    uid = db.Column(db.Integer, db.ForeignKey('user_info.uid'), nullable=False)

    def __repr__(self):
        return f"<Event {self.event_name}>"

