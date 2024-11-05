from flask import Blueprint, request, jsonify
from services.product_service import list_products, retrieve_product, add_product, modify_product, remove_product
from utils.auth import validate_token

product_blueprint = Blueprint('product', __name__)

@product_blueprint.route('/products', methods=['GET'])
def get_products():
    products = list_products()
    return jsonify(products)

@product_blueprint.route('/products', methods=['POST'])
def create_product():
    token = request.headers.get('Authorization')
    if not validate_token(token):
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    product_id = add_product(data)
    return jsonify({'message': 'Product created', 'product_id': product_id})

@product_blueprint.route('/products/<product_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_product(product_id):
    if request.method == 'GET':
        product = retrieve_product(product_id)
        return jsonify(product if product else {'message': 'Product not found'})
    elif request.method == 'PUT':
        data = request.json
        modify_product(product_id, data)
        return jsonify({'message': 'Product updated'})
    elif request.method == 'DELETE':
        remove_product(product_id)
        return jsonify({'message': 'Product deleted'})
