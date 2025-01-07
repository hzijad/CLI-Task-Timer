# app.py
from flask import Flask
from routes.index import index_bp
from routes.users import users_bp
from routes.timerRequests import timer_requests_bp
from flask_cors import CORS
app = Flask(__name__)

CORS(app)  # This will allow all domains to make requests to this server

app.register_blueprint(index_bp)
app.register_blueprint(users_bp, url_prefix='/users')
app.register_blueprint(timer_requests_bp, url_prefix='/timerRequests')

if __name__ == '__main__':
    app.run(debug=True)
