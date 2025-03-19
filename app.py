import os
from flask import Flask, render_template, session,redirect,url_for
from flask_sqlalchemy import SQLAlchemy


# Initialize the Flask application
app = Flask(__name__, template_folder=os.path.join('frontend', 'templates'), 
            static_folder='frontend/static')  


# Secret key for flash messages and sessions
#app.secret_key = os.urandom(24)
app.secret_key = os.getenv('SECRET_KEY', 'your-super-secret-key')

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


# Register the blueprint for log in
from backend.add_event import addevent_blueprint
app.register_blueprint(addevent_blueprint)

# Register the events blueprint from fetchAll_event.py
from backend.fetchAll_event import events_blueprint
app.register_blueprint(events_blueprint)

# Register the events blueprint from search.py
from backend.search import search_blueprint
app.register_blueprint(search_blueprint)

# Register the events blueprint from edit_event.py
from backend.edit_event import edit_events_blueprint
app.register_blueprint(edit_events_blueprint)

# Register the join event blueprint
from backend.join_event import join_event_blueprint
app.register_blueprint(join_event_blueprint)

# Register the img rendering blueprint
from backend.img_rendering import img_blueprint
app.register_blueprint(img_blueprint)
# Register the img del rendering blueprint
from backend.delete_img import delete_image
app.register_blueprint(delete_image)


# Route for the home page (index)
@app.route('/')
def index():
    return render_template('index.html')  # Will look in the 'frontend' folder for this file


# debug
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)


