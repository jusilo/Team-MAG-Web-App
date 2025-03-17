from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from datetime import datetime, timezone
from app import db
from .model import User, Event, Event_album  # Import the User and Event model from the main app

# Define the Blueprint
addevent_blueprint = Blueprint('addevent', __name__, template_folder='frontend/templates')


@addevent_blueprint.route('/addevent', methods=['GET', 'POST'])
def addevent():
    # Check if user is logged in before proceeding
    files = request.files.getlist('imagefiles')

    if not files or all(file.filename == '' for file in files):
        flash("No files uploaded", "error")
    print("Received files:", [file.filename for file in files])  # Debugging



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
        # Convert uploaded files to binary
        file_data = [file.read() for file in files if file.filename]

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
        db.session.add(new_event)
        db.session.flush()
        if file_data:  
            # Insert into Event_album with BYTEA[]
            new_album = Event_album(
                event_id=new_event.event_id,
                event_images=file_data  
            )
            db.session.add(new_album)
        db.session.commit()
        flash("New event created", "success")

    # Render the form for adding event
    return render_template("add-event.html", userinfo=userinfo)
