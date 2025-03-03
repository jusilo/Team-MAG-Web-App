import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy


# Initialize the Flask application
app = Flask(__name__, template_folder=os.path.join('frontend', 'templates'), 
            static_folder='frontend/static')  


# Secret key for flash messages and sessions
app.secret_key = os.urandom(24)

# Database setup (Replace with your PostgreSQL database URL)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://team_mang:admin@localhost:5432/event_app'  # Adjust this
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Register the blueprint for registration
from backend.register import register_blueprint
app.register_blueprint(register_blueprint)

# Register the blueprint for log in
from backend.log_in import login_blueprint
app.register_blueprint(login_blueprint)

# Route for the home page (index)
@app.route('/')
def index():
    return render_template('index.html')  # Will look in the 'frontend' folder for this file

# Route for the home page
@app.route('/home')
def home_page():
    return render_template('home.html')  # Will look in the 'frontend' folder for this file



# Run the application
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
