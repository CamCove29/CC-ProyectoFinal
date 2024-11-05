from models.order_model import get_all_orders, get_order_by_id, create_order, update_order, delete_order

def list_orders():
    return get_all_orders()

def retrieve_order(order_id):
    return get_order_by_id(order_id)

def add_order(data):
    return create_order(data)

def modify_order(order_id, data):
    update_order(order_id, data)

def remove_order(order_id):
    delete_order(order_id)
