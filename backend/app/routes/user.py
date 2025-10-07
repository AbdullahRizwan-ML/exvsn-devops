from fastapi import APIRouter, HTTPException, Depends
from app.models.user import UserCreate, UserLogin, UserResponse
from app.db.mongo import get_collection, doc_helper
from app.utils.auth import hash_password, verify_password, create_access_token

router = APIRouter()
users_collection = lambda: get_collection("users")

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    existing = await users_collection().find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    result = await users_collection().insert_one(user_dict)

    return UserResponse(id=str(result.inserted_id), email=user.email, full_name=user.full_name)

@router.post("/login")
async def login(user: UserLogin):
    existing = await users_collection().find_one({"email": user.email})
    if not existing or not verify_password(user.password, existing["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
