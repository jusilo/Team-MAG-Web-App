from flask import Blueprint, render_template, request, redirect, url_for, flash,session
from werkzeug.security import generate_password_hash
from app import db
from .model import Event, Event_album  # Import the User model from the main app

# Define the Blueprint
myEvent_Blueprint = Blueprint('my_event', __name__, template_folder='frontend/templates')

# Route for the registration page
@myEvent_Blueprint.route('/viewEvent', methods=['GET', 'POST'])
def viewEvent():
    user_id = session.get('uid')
    events = Event.query.all()  
    event_albums = {}
    if not user_id:
        flash('Please log in to view your events', 'warning')
        return redirect(url_for('index'))
    
    # Query events where the user is in event_attendees
    joined_events = Event.query.filter(
        Event.event_attendees.contains([user_id])
    ).order_by(Event.event_day.desc()).all()
    for event in events:

        album = Event_album.query.filter_by(event_id=event.event_id).first()
        event_albums[event.event_id]= album

    return render_template('my_events.html', joined_events=joined_events,event_albums=event_albums)