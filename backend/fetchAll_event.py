from flask import Blueprint, render_template, redirect, url_for, session

from .model import Event  # Import the User model from the main app

events_blueprint = Blueprint('events', __name__, template_folder='frontend/templates')

@events_blueprint.route('/home', methods=['GET'])
def home_page():
    if 'uid' not in session:  # Check if user is logged in
        return render_template("index.html")  # Redirect to login if not logged in
    
    user_id = session['uid']  # Get the user ID from the session
    # Fetch all events from the database (no pagination)
    events = Event.query.all()  # Fetch all records from the event table

      #Collect attendees for each event in a dictionary
    attendees_map = {}
    user_joined_events = set ()
    for event in events:

        # Get all attendees except the creator
        attendees =event.get_attendee_users()
        attendees_map[event.event_id] = [attendee for attendee in attendees if attendee.uid != event.uid]

        #Check if the current user is attending the event
        if user_id in event.event_attendees and user_id != event.uid:
            user_joined_events.add(event.event_id)

    #Pass the events and the attendees map to the template
    return render_template('home.html', events=events, attendees_map=attendees_map, user_joined_events=user_joined_events)


