from flask import Blueprint, request, jsonify, session, redirect, url_for, flash, render_template
from app import db
from .model import Event, User
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import array
import logging

# Create Blueprint
join_event_blueprint = Blueprint('join_event', __name__)

@join_event_blueprint.route('/join_event/<int:event_id>', methods=['POST'])
def join_event(event_id):
    # Get current user's ID from session
    user_id = session.get('uid')
    if not user_id:
        flash('User not logged in', 'error')
        return render_template("index.html")  # Redirect to login page
    logging.info(f"User ID from session: {user_id}")

    # Fetch the event by ID
    event = Event.query.get(event_id)
    if not event:
        flash('Event not found', 'error')
        return redirect(url_for('events.home_page'))   # Redirect to home page or a list of events
    logging.info(f"Event found: {event.event_name}")

    try:
    # If event_attendees is None (initialize it as an empty list)
        if event.event_attendees is None:
            event.event_attendees = []

        logging.info(f"Current attendees before adding: {event.event_attendees}")

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

        logging.info(f"Updated attendees list: {event.event_attendees + [user_id]}")

        flash('Successfully joined the event', 'success')
        return redirect(url_for('events.home_page'))

    
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error while joining event: {e}")
        flash('Error joining the event: ' + str(e), 'error')
        return redirect(url_for('events.home_page')) 
