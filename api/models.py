from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ARRAY
from sqlalchemy.dialects.postgresql import UUID
import uuid

db = SQLAlchemy()

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(10), nullable=False)
    products = relationship("Product", back_populates="category")

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'icon': self.icon}

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    imagepath = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    ingredients = db.Column(db.String)

    category = relationship("Category", backref="products_association", overlaps="category_reference,products_association")
    
def __init__(self, **kwargs):
    super(Product, self).__init__(**kwargs)
    self.id = uuid.uuid4().int

def to_dict(self):
    return {
        'id': str(self.id),
        'name': self.name,
        'description': self.description,
        'imagePath': self.imagePath, 
        'price': self.price,
        'category_id': self.category_id,
        'ingredients': self.ingredients
    }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), nullable=False)
    table_number = db.Column(db.String(50))
    status = db.Column(db.String(20), nullable=False, default='WAITING')
    products = db.Column(ARRAY(db.Integer), nullable=False)
