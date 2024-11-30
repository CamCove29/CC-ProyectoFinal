from app.models.order_model import (
    get_all_orders,
    get_order_by_id,
    create_order,
    update_order,
    delete_order,
)

def list_orders(tenant_id):
    return get_all_orders(tenant_id)

def retrieve_order(tenant_id, order_id):
    return get_order_by_id(tenant_id, order_id)

def add_order(tenant_id, data):
    return create_order(tenant_id, data)

def modify_order(tenant_id, order_id, data):
    return update_order(tenant_id, order_id, data)

def remove_order(tenant_id, order_id):
    delete_order(tenant_id, order_id)
