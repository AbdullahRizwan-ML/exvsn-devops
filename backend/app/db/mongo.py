import os
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "exvision_db")

client = None
db = None

async def connect_db():
    global client, db
    if not MONGO_URI:
        raise RuntimeError("MONGO_URI environment variable not set")
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    print("✅ Connected to MongoDB:", DB_NAME)

async def close_db():
    global client
    if client:
        client.close()
        print("🛑 MongoDB connection closed")

def get_collection(name: str):
    if db is None:
        raise RuntimeError("Database not initialized. Call connect_db first.")
    return db[name]

# 👇 Add this helper
def doc_helper(doc) -> dict:
    """Convert MongoDB document into JSON serializable dict"""
    return {
        "id": str(doc["_id"]),
        **{k: v for k, v in doc.items() if k != "_id"}
    }
