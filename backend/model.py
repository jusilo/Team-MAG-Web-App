from app import db

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

class UserInfo(db.Model):
    __tablename__ = 'event'
    event_id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=False)
    event_creator = db.Column(db.String(100), nullable=False)
    event_description = db.Column(db.String(10000), nullable=False)
    event_location = db.Column(db.String(10000), nullable=False)
    date_created = db.Column(db.DateTime, nullable=True)  # timestamp without time zone
    last_updated = db.Column(db.DateTime, nullable=True)  # timestamp without time zone
    event_attendees = db.Column(db.ARRAY(db.Integer), nullable=True)  # integer[]
    uid = db.Column(db.Integer, nullable=False)  # Foreign key reference (if needed)

    def __repr__(self):
        return f"<Event {self.event_name}>"

