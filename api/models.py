from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ARRAY
from sqlalchemy.dialects.postgresql import UUID
import uuid

db = SQLAlchemy()

product_categories = db.Table('product_categories',
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(10), nullable=False)
    products = db.relationship('Product', secondary=product_categories, backref=db.backref('categories', lazy='dynamic'))

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'icon': self.icon}

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    imagepath = db.Column(db.String, nullable=True)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, default=0)  
    ingredients = db.Column(db.String)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'imagepath': str(self.imagepath), 
            'price': self.price,
            'quantity': self.quantity,
            'ingredients': self.ingredients
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, nullable=False)
    table_number = db.Column(db.String(50))
    status = db.Column(db.String(20), nullable=False, default='WAITING')
    products = db.Column(ARRAY(db.Integer), nullable=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'order_id': self.order_id,
            'table_number': self.table_number,
            'status': self.status,
            'products': self.products
        }

        
