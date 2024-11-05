from flask import Blueprint, request, jsonify
from services.order_service import list_orders, retrieve_order, add_order, modify_order, remove_order
from utils.auth import validate_token

order_blueprint = Blueprint('order', __name__)

@order_blueprint.route('/orders', methods=['GET'])
def get_orders():
    orders = list_orders()
    return jsonify(orders)

@order_blueprint.route('/orders', methods=['POST'])
def create_order():
    token = request.headers.get('Authorization')
    if not validate_token(token):
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    order_id = add_order(data)
    return jsonify({'message': 'Order created', 'order_id': order_id})

@order_blueprint.route('/orders/<order_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_order(order_id):
    if request.method == 'GET':
        order = retrieve_order(order_id)
        return jsonify(order if order else {'message': 'Order not found'})
    elif request.method == 'PUT':
        data = request.json
        modify_order(order_id, data)
        return jsonify({'message': 'Order updated'})
    elif request.method == 'DELETE':
        remove_order(order_id)
        return jsonify({'message': 'Order deleted'})
