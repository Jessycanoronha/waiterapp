# api/middleware.py

import os
from flask import current_app

def configure_cors(app):
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*' 
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        return response

def create_upload_folder(app):
    @app.before_request
    def create_folder():
        upload_dir = os.path.join(current_app.root_path, 'uploads')
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)   