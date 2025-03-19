from flask import Blueprint, render_template, redirect, url_for, session, request, flash
from app import db
from .model import Event,Event_album  # Import the Event model from the main app
from datetime import datetime

edit_events_blueprint = Blueprint('edit-events', __name__, template_folder='frontend/templates')

@edit_events_blueprint.route('/edit-event/<int:event_id>', methods=['GET', 'POST'])
def editevent(event_id):
    # Get the event object by ID
    event = Event.query.get(event_id)
    album = Event_album.query.filter_by(event_id=event.event_id).first()
    
    # If event does not exist, redirect to home page
    if not event:
        return redirect(url_for('events.home_page'))

    if request.method == 'POST':
        action = request.form.get('action')  # Get the action from the hidden field
        
        if action == 'save':  # If "Save Changes" button was clicked
            event_name = request.form.get('event_name')
            event_description = request.form.get('event_description')
            location = request.form.get('location')
            
            # Parse the event_day using the method we created
            event_day_str = request.form.get('event_day')
            try:
                event_day = Event.parse_event_day(event_day_str)  # Safely parse the event date
            except ValueError as e:
                # Handle invalid date error (e.g., show an error message to the user)
                return render_template('edit-event.html', event=event, album=album, error_message=str(e))

            # Update the event object with new values
            event.event_name = event_name
            event.event_description = event_description
            event.location = location
            event.event_day = event_day
            
            # Update the last updated timestamp
            event.last_updated = datetime.now()

            # Commit changes to the database
            db.session.commit()
            flash("Event updated successfully", "success")
            
            # Redirect to the home page after successful update
            return redirect(url_for('events.home_page'))
        
        elif action == 'cancel':  # If "Cancel" button was clicked
            flash("Cancelled Edit", "info")
            return redirect(url_for('events.home_page'))  # Redirect to home page after canceling
    
    # Render the edit event page with the event data
    return render_template('edit-event.html', event=event, album=album)
