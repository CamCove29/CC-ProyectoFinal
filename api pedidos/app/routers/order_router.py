from fastapi import APIRouter, Header, HTTPException, Depends
from app.services.order_service import (
    list_orders,
    retrieve_order,
    add_order,
    modify_order,
    remove_order,
)
from app.utils.auth import validate_token

router = APIRouter()

@router.get("/")
async def get_orders(tenant_id: str = Header(None)):
    if not tenant_id:
        raise HTTPException(status_code=400, detail="Missing tenant ID")
    return list_orders(tenant_id)

@router.get("/{order_id}")
async def get_order(order_id: str, tenant_id: str = Header(None)):
    if not tenant_id:
        raise HTTPException(status_code=400, detail="Missing tenant ID")
    order = retrieve_order(tenant_id, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/")
async def create_order(data: dict, tenant_id: str = Header(None)):
    if not tenant_id:
        raise HTTPException(status_code=400, detail="Missing tenant ID")
    return add_order(tenant_id, data)

@router.put("/{order_id}")
async def update_order(order_id: str, data: dict, tenant_id: str = Header(None)):
    if not tenant_id:
        raise HTTPException(status_code=400, detail="Missing tenant ID")
    return modify_order(tenant_id, order_id, data)

@router.delete("/{order_id}")
async def delete_order(order_id: str, tenant_id: str = Header(None)):
    if not tenant_id:
        raise HTTPException(status_code=400, detail="Missing tenant ID")
    return remove_order(tenant_id, order_id)
