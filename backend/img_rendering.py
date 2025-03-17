from flask import Blueprint,Response
from .model import Event, User, Event_album

img_blueprint = Blueprint('img', __name__)

@img_blueprint.route('/image/<int:album_id>/<int:image_index>')
def image(album_id, image_index):
    album = Event_album.query.get_or_404(album_id)
    try:
        image_data = album.event_images[image_index]
    except IndexError:
        return "Image not found", 404

    return Response(image_data, mimetype='image/jpeg')  # or png if needed