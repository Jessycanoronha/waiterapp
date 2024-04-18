from flask import jsonify, request
from models import db, Order, Product
from flask_cors import cross_origin
from flask import request

def initialize_routes(app):
    @app.route('/orders', methods=['GET'])
    def list_orders():
        try:
            orders = Order.query.all()
            order_list = []
            for idx, order in enumerate(orders, start=1):
                product_details = []
                for product_id in order.products:
                    product = Product.query.get(product_id)
                    product_details.append({
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'imagepath': product.imagepath,
                        'price': product.price,
                        'quantity': product.quantity,
                        'ingredients': product.ingredients,
                        'category_id': product.category_id
                    })

                order_data = {
                    'id': idx,
                    'order_id': order.order_id,
                    'table_number': order.table_number,
                    'status': order.status,
                    'products': product_details
                }
                order_list.append(order_data)
            return jsonify(order_list), 200
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to fetch orders'}), 500

    @app.route('/orders', methods=['POST'])
    def create_order():
        try:
            data = request.json
            order_id = data.get('order_id')
            table_number = data.get('table_number')
            status = data.get('status')
            products = data.get('products')

            if not order_id:
                return jsonify({'error': 'Order ID is required'}), 400
            if not status:
                return jsonify({'error': 'Status is required'}), 400
            if status not in ['WAITING', 'IN_PRODUCTION', 'DONE']:
                return jsonify({'error': 'Invalid status. Status should be one of: WAITING, IN_PRODUCTION, DONE'}), 400
            if not products:
                return jsonify({'error': 'Products are required'}), 400

            order = Order(order_id=order_id, table_number=table_number, status=status, products=products)
            db.session.add(order)
            db.session.commit()

            return jsonify({'message': 'Order created successfully'}), 201
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to create order'}), 500

    @app.route('/orders/<int:orderId>', methods=['PATCH'])
    def change_order_status(orderId):
        try:
            request_status = request.json.get('status')

            if request_status not in ['WAITING', 'IN_PRODUCTION', 'DONE']:
                return jsonify({'error': 'Status should be one of these: WAITING, IN_PRODUCTION, DONE'}), 400

            order = Order.query.get(orderId)
            if not order:
                return jsonify({'error': 'Order not found'}), 404

            order.status = request_status
            db.session.commit()

            return '', 204
        except Exception as e:
            print(e)
            return '', 500

    @app.route('/orders/<int:orderId>', methods=['DELETE'])
    def cancel_order(orderId):
        try:
            order = Order.query.get(orderId)
            if not order:
                return jsonify({'error': 'Order not found'}), 404

            db.session.delete(order)
            db.session.commit()

            return '', 204
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to cancel order'}), 500
        
    @app.route('/orders/<int:orderId>', methods=['GET'])
    def get_order(orderId):
        try:
            order = Order.query.get(orderId)
            if not order:
                return jsonify({'error': 'Order not found'}), 404

            product_details = []
            for product_id in order.products:
                product = Product.query.get(product_id)
                if product:
                    product_details.append({
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'imagepath': product.imagepath,
                        'price': product.price
                    })

            return jsonify({
                'order_id': order.id,
                'table_number': order.table_number,
                'status': order.status,
                'products': product_details
            }), 200
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to fetch order'}), 500
    
    @app.route('/orders/<int:orderId>/status', methods=['PATCH'])
    @cross_origin()
    def update_order_status(orderId):
        try:
            data = request.json
            status = data.get('status')

            if not status or status not in ['WAITING', 'IN_PRODUCTION', 'DONE']:
                return jsonify({'error': 'Invalid status. Status should be one of: WAITING, IN_PRODUCTION, DONE'}), 400

            order = Order.query.get(orderId)
            if not order:
                return jsonify({'error': 'Order not found'}), 404

            order.status = status
            db.session.commit()

            return '', 204
        except Exception as e:
            print(e)
            return jsonify({'error': 'Failed to update order status'}), 500
