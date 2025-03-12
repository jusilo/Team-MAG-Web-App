from flask import Blueprint, render_template, redirect, url_for, session

from .model import Event  # Import the User model from the main app

events_blueprint = Blueprint('events', __name__, template_folder='frontend/templates')

@events_blueprint.route('/home', methods=['GET'])
def home_page():
    if 'uid' not in session:  # Check if user is logged in
        return redirect(url_for('login.login'))  # Redirect to login if not logged in
    
    # Fetch all events from the database (no pagination)
    events = Event.query.all()  # Fetch all records from the event table
      #Collect attendees for each event in a dictionary
    attendees_map = {}
    for event in events:
        attendees_map[event.event_id] = event.get_attendee_users()

    #Pass the events and the attendees map to the template
    return render_template('home.html', events=events, attendees_map=attendees_map)


