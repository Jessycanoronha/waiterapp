from flask import Flask
from routes import category_routes, product_routes, order_routes
from models import db
import middleware
from flask_swagger_ui import get_swaggerui_blueprint
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER')
db.init_app(app)
migrate = Migrate(app, db)

middleware.configure_cors(app)
middleware.create_upload_folder(app)

category_routes.initialize_routes(app)
product_routes.initialize_routes(app)
order_routes.initialize_routes(app)

SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'WaiterApp'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)
