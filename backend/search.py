from flask import Blueprint, render_template, redirect, url_for, session, request
from flask import Blueprint, render_template, session

from .model import Event, Event_album

search_blueprint = Blueprint('search', __name__, template_folder='frontend/templates')

@search_blueprint.route('/search', methods=['GET', 'POST'])
def search():
    if 'uid' not in session:  # Check if user is logged in
        return redirect(url_for('login.login'))  # Redirect to login if not logged in
    user_id = session['uid']
    keywords = request.form.get("search")
    # Fetch all events from the database (no pagination)
    print(keywords)
    events = Event.query.filter(Event.event_name.like(f"%{keywords}%")).all()  # Fetch all records from the event table
    #to print names instead of UID
    attendees_map = {} 
    event_albums = {}
    user_joined_events = set ()
    for event in events:

        # Get all attendees except the creator
        attendees =event.get_attendee_users()
        if attendees:
            attendees_map[event.event_id] = [attendee for attendee in attendees if attendee.uid != event.uid]
        else:
            attendees_map[event.event_id] = {}

        #Check if the current user is attending the event
        if user_id in event.event_attendees and user_id != event.uid:
            user_joined_events.add(event.event_id)  
        
        album = Event_album.query.filter_by(event_id=event.event_id).first()
        event_albums[event.event_id] = album
    # Render the template and pass the events to it
    return render_template('home.html', events=events, attendees_map=attendees_map, user_joined_events=user_joined_events,event_albums=event_albums)