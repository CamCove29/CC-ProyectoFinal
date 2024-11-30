from fastapi import FastAPI
from mangum import Mangum
from app.routers.order_router import router as order_router

app = FastAPI()

app.include_router(order_router, prefix="/orders", tags=["Orders"])

# Adaptador para AWS Lambda
handler = Mangum(app)
