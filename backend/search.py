from flask import Blueprint, render_template, redirect, url_for, session, request

from .model import Event  # Import the User model from the main app

search_blueprint = Blueprint('search', __name__, template_folder='frontend/templates')

@search_blueprint.route('/search', methods=['GET', 'POST'])
def search():
    if 'uid' not in session:  # Check if user is logged in
        return redirect(url_for('login.login'))  # Redirect to login if not logged in
    
    keywords = request.form.get("search")
    # Fetch all events from the database (no pagination)
    print(keywords)
    events = Event.query.filter(Event.event_name.like(f"%{keywords}%")).all()  # Fetch all records from the event table
    #to print names instead of UID
    attendees = []  
    for event in events:
        print ("route testing")
        attendees = event.get_attendee_users()  
        print(f"Attendees for {event.event_name}: {attendees}")

    # Render the template and pass the events to it
    return render_template('home.html', events=events, attendees=attendees)