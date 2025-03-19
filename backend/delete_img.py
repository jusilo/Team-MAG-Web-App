from .model import  Event_album
from flask import Blueprint

from app import db
from flask import jsonify


delete_image = Blueprint('del', __name__)
@delete_image.route('/delete-image/<int:album_id>/<int:image_index>', methods=['DELETE'])
def delete(album_id, image_index):
    album = Event_album.query.get_or_404(album_id)

    if not album.event_images or image_index < 0 or image_index >= len(album.event_images):
        return jsonify({'success': False, 'message': 'Image not found'}), 404

    # Remove the image at the given index
    images = album.event_images
    del images[image_index]
    
    # Update the array in the DB
    album.event_images = images
    db.session.commit()

    return jsonify({'success': True}), 200
