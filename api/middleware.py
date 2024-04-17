import os
from flask import current_app
from models import db

def save_image(image):
    upload_dir = os.path.join(current_app.root_path, 'uploads')
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    imagepath = os.path.join(upload_dir, image.filename)
    image.save(imagepath)
    return imagepath

def configure_cors(app):
    CORS(app)

def create_upload_folder(app):
    @app.before_first_request
    def create_folder():
        upload_dir = app.config['UPLOAD_FOLDER']
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
