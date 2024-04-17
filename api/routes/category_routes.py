from flask import jsonify, request
from werkzeug.utils import secure_filename
import traceback
from models import db,Category
from flask import send_from_directory
import os

def initialize_routes(app):
    @app.route('/categories')
    def list_categories():
        try:
            categories = Category.query.all()
            category_list = [category.to_dict() for category in categories]
            return jsonify(category_list), 200
        except Exception as e:
            print("Exception in list_categories route:")
            traceback.print_exc()
            return jsonify({'error': 'Failed to fetch categories', 'message': str(e)}), 500

    @app.route('/categories', methods=['POST'])
    def create_category():
        try:
            data = request.json
            icon = data.get('icon')
            name = data.get('name')

            if not name:
                return jsonify({'error': 'Name is required'}), 400

            category = Category(icon=icon, name=name)
            db.session.add(category)
            db.session.commit()

            return jsonify(category.to_dict()), 201
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to create category'}), 500

    @app.route('/uploads/<path:filename>')
    def download_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    
    @app.route('/file/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(os.path.join(app.root_path, app.config['UPLOAD_FOLDER']), filename)