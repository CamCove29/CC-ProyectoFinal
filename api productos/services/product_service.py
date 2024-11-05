from models.product_model import get_all_products, get_product_by_id, create_product, update_product, delete_product

def list_products():
    return get_all_products()

def retrieve_product(product_id):
    return get_product_by_id(product_id)

def add_product(data):
    return create_product(data)

def modify_product(product_id, data):
    update_product(product_id, data)

def remove_product(product_id):
    delete_product(product_id)
