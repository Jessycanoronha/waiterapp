from flask import jsonify, request, json
from werkzeug.utils import secure_filename
import traceback
import os
import re
from models import db, Product

def initialize_routes(app):
    @app.route('/products', methods=['GET'])
    def list_products():
        try:
            products = Product.query.all()
            product_list = []
            for product in products:
                product_dict = {
                    'id': str(product.id),
                    'name': product.name,
                    'description': product.description,
                    'imagepath': product.imagepath,
                    'price': str(product.price),
                    'category_id': product.category_id,
                    'ingredients': product.ingredients
                }
                product_list.append(product_dict)
            return jsonify(product_list), 200
        except Exception as e:
            print("Exception in list_products route:")
            traceback.print_exc()
            return jsonify({'error': 'Failed to fetch products', 'message': str(e)}), 500

    @app.route('/products', methods=['POST'])
    def create_product():
        try:
            name = request.form.get('name')
            description = request.form.get('description')
            imagepath = request.files.get('image')  
            price = request.form.get('price')
            category_id = request.form.get('category_id') 
            ingredients = request.form.get('ingredients')

            missing_fields = []
            if not name:
                missing_fields.append('name')
            if not description:
                missing_fields.append('description')
            if not imagepath:
                missing_fields.append('imagepath')
            if not price:
                missing_fields.append('price')
            if not category_id:
                missing_fields.append('category_id')
            if not ingredients:
                missing_fields.append('ingredients')

            if missing_fields:
                return jsonify({'error': 'Missing required fields', 'fields': missing_fields}), 400

            # Salvar a imagem no diretório de uploads
            filename = secure_filename(imagepath.filename)
            imagepath.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Criar o produto no banco de dados
            product = Product(
                name=name,
                description=description,
                imagepath=os.path.join(app.config['UPLOAD_FOLDER'], filename),  
                price=price,
                category_id=category_id,
                ingredients=ingredients
            )
            db.session.add(product)
            db.session.commit()

            return jsonify({'message': 'Product created successfully', 'product_id': product.id}), 201
        except Exception as e:
            print("Exception in create_product route:")
            traceback.print_exc()
            return jsonify({'error': 'Failed to create product', 'message': str(e)}), 500
