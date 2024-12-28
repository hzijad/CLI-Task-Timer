# app.py
from flask import Flask
from routes.index import index_bp
from routes.users import users_bp
from routes.timerRequests import timer_requests_bp
app = Flask(__name__)

app.register_blueprint(index_bp)
app.register_blueprint(users_bp, url_prefix='/users')
app.register_blueprint(timer_requests_bp, url_prefix='/timerRequests')

if __name__ == '__main__':
    app.run(debug=True)
