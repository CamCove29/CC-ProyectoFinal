from flask import Blueprint, request, jsonify
from services.user_service import list_users, retrieve_user, add_user, modify_user, remove_user
from utils.auth import validate_token

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/users', methods=['GET'])
def get_users():
    users = list_users()
    return jsonify(users)

@user_blueprint.route('/users', methods=['POST'])
def create_user():
    token = request.headers.get('Authorization')
    if not validate_token(token):
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    user_id = add_user(data)
    return jsonify({'message': 'User created', 'user_id': user_id})

@user_blueprint.route('/users/<user_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_user(user_id):
    if request.method == 'GET':
        user = retrieve_user(user_id)
        return jsonify(user if user else {'message': 'User not found'})
    elif request.method == 'PUT':
        data = request.json
        modify_user(user_id, data)
        return jsonify({'message': 'User updated'})
    elif request.method == 'DELETE':
        remove_user(user_id)
        return jsonify({'message': 'User deleted'})
