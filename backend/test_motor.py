# test_motor.py
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") 
DB_NAME = os.getenv("DB_NAME")

async def test():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]

    # Insert a doc
    res = await db.test_collection.insert_one({"name": "test", "value": 123})
    print("Inserted id:", res.inserted_id)

    # Read it back
    doc = await db.test_collection.find_one({"_id": res.inserted_id})
    print("Found doc:", doc)

    # List collections
    print("Collections:", await db.list_collection_names())

    client.close()

asyncio.run(test())
