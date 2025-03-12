from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from datetime import datetime, timezone
from app import db
from .model import User, Event  # Import the User and Event model from the main app

# Define the Blueprint
addevent_blueprint = Blueprint('addevent', __name__, template_folder='frontend/templates')

@addevent_blueprint.route('/addevent', methods=['GET', 'POST'])
def addevent():
    # Check if user is logged in before proceeding
    userid = session.get('uid')
    if not userid:
        flash('Please log in to add an event.', 'error')
        return render_template("index.html")
    
    userinfo = User.query.filter_by(uid=userid).first()
    if not userinfo:
        flash('User not found.', 'error')
        return redirect(url_for('login.login'))

    if request.method == 'POST':
        # Handle POST request (creating event)
        event_name = request.form.get('eventName')
        event_creator = f"{userinfo.first_name} {userinfo.last_name}"
        description = request.form.get('eventDescription')
        location = request.form.get('eventPlace')  
        event_date = request.form.get('eventDate')

        if event_date and event_name and event_creator and location and description:
            new_event = Event(
                event_name=event_name, 
                event_creator=event_creator, 
                event_description=description,
                location=location,  
                event_day=datetime.strptime(event_date, "%Y-%m-%d").date(),
                date_created=datetime.now(timezone.utc), 
                last_updated=datetime.now(timezone.utc),
                event_attendees=[userid, 0],
                uid=userid
            )
            
            try:
                db.session.add(new_event)
                db.session.commit()
                flash("New event created", "success")
                # Redirect to home page after success
                return redirect(url_for('events.home_page')) 
            except Exception as e:
                db.session.rollback()
                flash(f"Error: {e}", "error")

    # Render the form for adding event
    return render_template("add-event.html", userinfo=userinfo)
