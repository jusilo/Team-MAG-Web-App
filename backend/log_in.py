#no js but works with post man
from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import check_password_hash
from app import db
from .model import User  # Import the User model from the main app

# Define the Blueprint
login_blueprint = Blueprint('login', __name__, template_folder='frontend/templates')

@login_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()  # Ensure it's JSON format
        if not data:
            flash("Invalid request format", "error")
            return render_template("index.html")

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()  # Fetch user by email

        if user and check_password_hash(user.password, password):  # Verify password
            print("Login successful:", email)
            return redirect(url_for('home_page'))  # Redirect to home page

        flash("Invalid email or password", "error")  # Flash message for invalid login

    return render_template("index.html")  # Stay on login page if login fails

