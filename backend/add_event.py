from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from datetime import datetime,timezone
from werkzeug.security import check_password_hash
from app import db
from .model import User,Event  # Import the User and event model from the main app


# Define the Blueprint
addevent_blueprint = Blueprint('addevent', __name__, template_folder='frontend/templates')
@addevent_blueprint.route('/addevent', methods=['GET', 'POST'])
def addevent():
    userid = session.get('uid')
    
    userinfo = User.query.filter_by(uid=userid).first()
    
    
    
    event_name = request.form.get('eventName')
    event_creator = userinfo.first_name + ' ' + userinfo.last_name
    
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
        except Exception as e:
            db.session.rollback()
            flash("Error:", e)

        flash("new event created", "sucess")
   
    return redirect(url_for('addevent'))

