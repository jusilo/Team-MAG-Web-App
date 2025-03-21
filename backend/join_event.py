from flask import Blueprint, request, jsonify, session, redirect, url_for, flash, render_template
from app import db
from .model import Event, User, Event_album
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import array


# Create Blueprint
join_event_blueprint = Blueprint('join_event', __name__)

@join_event_blueprint.route('/join_event/<int:event_id>', methods=['POST'])
def join_event(event_id):
    # Get current user's ID from session
    user_id = session.get('uid')
    if not user_id:
        flash('User not logged in', 'error')
        return render_template("index.html")  # Redirect to login page

    # Fetch the event by ID
    event = Event.query.get(event_id)
    if not event:
        flash('Event not found', 'error')
        return redirect(url_for('events.home_page'))   # Redirect to home page or a list of events

    try:
    # If event_attendees is None (initialize it as an empty list)
        if event.event_attendees is None:
            event.event_attendees = []

        # Check if user is already attending
        if user_id in event.event_attendees:
            flash('You are already attending this event', 'warning')
            return redirect(url_for('events.home_page'))

         # Append new user without replacing existing attendees
        db.session.execute(
            Event.__table__.update().
            where(Event.event_id == event_id).
            values(event_attendees=func.array_append(Event.event_attendees, user_id))
        )
        db.session.commit()


        flash('Successfully joined the event', 'success')
        return redirect(url_for('events.home_page'))

    
    except SQLAlchemyError as e:
        db.session.rollback()
        flash('Error joining the event: ' + str(e), 'error')
        return redirect(url_for('events.home_page')) 
    
#Route for canceling or deleting an event
@join_event_blueprint.route('/cancel_event/<int:event_id>', methods=['POST'])
def cancel_event(event_id):
    user_id = session.get('uid')
    if not user_id:
        flash('User not logged in', 'error')
        return render_template("index.html")  # Redirect to login page
    
    event = Event.query.get(event_id)
    if not event:
        flash('Event not found', 'error')
        return redirect(url_for('events.home_page'))
    
    try:
        #If the user is the creator → DELETE the event
        if user_id == event.uid:
            
            # Delete the related event_album entries manually
            db.session.query(Event_album).filter(Event_album.event_id == event_id).delete()

            #Now delete the event
            db.session.delete(event)
            db.session.commit()
            flash('Event deleted', 'success')
            return redirect(url_for('events.home_page'))
        
        #If the user is a participant → REMOVE them from attendees
        elif user_id in event.event_attendees:
            # Use `func.array_remove` to safely remove the user from the attendees array
            db.session.execute(
                Event.__table__.update().
                where(Event.event_id == event_id).
                values(event_attendees=func.array_remove(Event.event_attendees, user_id))
            )
            db.session.commit()
            flash('You have left the event', 'success')
            return redirect(url_for('events.home_page'))
        
        else:
            flash('You are not attending this event', 'warning')

        return redirect(url_for('events.home_page'))
    
    except SQLAlchemyError as e:
        db.session.rollback()
        flash('Error canceling the event: ' + str(e), 'error')
        return redirect(url_for('events.home_page'))