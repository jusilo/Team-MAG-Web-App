from flask import Blueprint, render_template, redirect, url_for, session
from app import db
from .model import UserInfo  # Import the User model from the main app

events_blueprint = Blueprint('events', __name__, template_folder='frontend/templates')

@events_blueprint.route('/home', methods=['GET'])
def home_page():
    if 'uid' not in session:  # Check if user is logged in
        return redirect(url_for('login.login'))  # Redirect to login if not logged in
    
    # Fetch all events from the database (no pagination)
    events = UserInfo.query.all()  # Fetch all records from the event table
    
    # Render the template and pass the events to it
    return render_template('home.html', events=events)

