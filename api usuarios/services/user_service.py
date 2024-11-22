from models.user_model import get_all_users, get_user_by_id, create_user, update_user, delete_user

def list_users():
    return get_all_users()

def retrieve_user(user_id):
    return get_user_by_id(user_id)

def add_user(data):
    return create_user(data)

def modify_user(user_id, data):
    update_user(user_id, data)

def remove_user(user_id):
    delete_user(user_id)
