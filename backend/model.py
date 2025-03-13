from app import db
from sqlalchemy.dialects.postgresql import ARRAY, BYTEA
from datetime import datetime

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

    # Relationship to fetch user objects based on event_attendees IDs
    def get_attendee_users(self):
        return User.query.filter(User.uid.in_(self.event_attendees)).all()

    # Update event details
    def update_event(self, event_name, event_description, location, event_day):
        self.event_name = event_name
        self.event_description = event_description
        self.location = location
        self.event_day = event_day
        self.last_updated = datetime.now()
        db.session.commit()

    # Static method to parse event_day string to a Date object
    @staticmethod
    def parse_event_day(event_day_str):
        """Safely parse the event day string to a date object."""
        try:
            return datetime.strptime(event_day_str, '%Y-%m-%d').date()  # Adjust the format if needed
        except ValueError:
            raise ValueError("Invalid date format. Please use YYYY-MM-DD.")
class Event_album(db.Model):
    __tablename__ = 'event_album'

    album_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.event_id'), nullable=False)
    event_images = db.Column(ARRAY(BYTEA), nullable=True)  # Stores multiple images as BYTEA[]

