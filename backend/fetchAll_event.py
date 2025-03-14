from flask import Blueprint, render_template, redirect, url_for, session

from .model import Event  # Import the User model from the main app

events_blueprint = Blueprint('events', __name__, template_folder='frontend/templates')

@events_blueprint.route('/home', methods=['GET'])
def home_page():
    if 'uid' not in session:  # Check if user is logged in
        return redirect(url_for('login.login'))  # Redirect to login if not logged in
    
    # Fetch all events from the database (no pagination)
    events = Event.query.all()  # Fetch all records from the event table
    #to print names instead of UID
    for event in events:
        attendees = event.get_attendee_users()  
    

    # Render the template and pass the events to it
    return render_template('home.html', events=events, attendees=attendees)


