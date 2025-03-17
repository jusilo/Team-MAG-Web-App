#no js but works with post man
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash
from app import db
from .model import User  # Import the User model from the main app

# Define the Blueprint
login_blueprint = Blueprint('login', __name__, template_folder='frontend/templates')


@login_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()  # Fetch user by email

        if user and check_password_hash(user.password, password):  # Verify password

            print("Login successful:", email)
            session['uid'] = user.uid  # Store user ID in session
            session['email'] = user.email  # Store email in session
            print("Session Data:", session)  # Debugging: Print session data to console

            flash("Login successful:", email)

            return redirect(url_for('events.home_page'))  # Redirect to home page

        flash("Invalid email or password", "error")  # Flash message for invalid login

    return render_template("index.html")  # Stay on login page if login fails

#log out, no ui yet
@login_blueprint.route('/logout',methods=['GET', 'POST'])
def logout():
    session.pop('uid', None)  # Remove user ID from session
    session.pop('email', None)  # Remove email from session 
    print("Session Data:", session)  # Debugging: Print session data to console
    flash("You have been logged out", "info")
    return render_template("index.html")  # Redirect to login page