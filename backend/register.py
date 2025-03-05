from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash
from app import db
from .model import User  # Import the User model from the main app

# Define the Blueprint
register_blueprint = Blueprint('register', __name__, template_folder='frontend/templates')

# Route for the registration page
@register_blueprint.route('/signup', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        age = request.form['age']
        email = request.form['email']
        password = request.form['password']
        confirm_password=request.form['confirm_password']

        #Firstname and Lastname Validation

        if not first_name or not last_name:
            flash('First name and last name are required.', 'danger')
            return redirect(url_for('register.register'))


        # Age Validation
        try:
            age = int(age)
            if age < 18:
                flash('You must be at least 18 years old to register.', 'danger')
                return redirect(url_for('register.register'))
        except ValueError:
            flash('Age must be a valid number.', 'danger')
            return redirect(url_for('register.register'))
        
        # Email Validation
        if not email or '@' not in email:
            flash('Invalid email format.', 'danger')
            return redirect(url_for('register.register'))
        
        # Password Validation: Ensure password have 8 characters
        if len (password) < 8:
            flash("Password must be at least 8 characters long.", 'danger')
            return redirect(url_for('register.register'))
        
        # Confirm password validation
        if password != confirm_password:
            flash("Passwords do not match.", 'danger')
            return redirect(url_for('register.register'))
        

        # Hash the password using pbkdf2:sha256
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        # Check if the email already exists
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            flash("Email is already taken!", 'danger')
            return redirect(url_for('register.register'))

        # Create a new user instance
        new_user = User(first_name=first_name, last_name=last_name, age=age, email=email, password=hashed_password)

        # Add and commit the new user to the database
        db.session.add(new_user)
        db.session.commit()

        flash("User registered successfully!", 'success')
        return redirect(url_for('index'))  # Redirect to the homepage

    return render_template('signup.html')