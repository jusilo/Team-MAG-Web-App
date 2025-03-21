from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, ARRAY, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Database connection URL
DATABASE_URL = "postgresql://team_mang:admin@localhost/event_app"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define User model
class UserInfo(Base):
    __tablename__ = "user_info"

    uid = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    age = Column(Integer)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(Text, nullable=False)

# Define Event model
class Event(Base):
    __tablename__ = "event"

    event_id = Column(Integer, primary_key=True, index=True)
    event_name = Column(String)
    event_creator = Column(String)
    event_description = Column(Text)
    location = Column(String)
    event_day = Column(Date)
    date_created = Column(DateTime)
    last_updated = Column(DateTime)
    event_attendees = Column(ARRAY(Integer))
    uid = Column(Integer, ForeignKey("user_info.uid"))

# Define EventAlbum model
class EventAlbum(Base):
    __tablename__ = "event_album"

    album_id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("event.event_id"))
    event_images = Column(ARRAY(String))  # Using String instead of bytea for simplicity

def setup_database():
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    setup_database() 