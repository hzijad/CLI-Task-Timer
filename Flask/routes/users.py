# routes/users.py
from flask import Blueprint

users_bp = Blueprint('users', __name__)

@users_bp.route('/')
def users():
    return 'respond with a resource'
