import requests
from datetime import datetime

BASE_URL = "http://localhost:3000/api"
USER_ID = 123123  # Will be created in setup

def setup_module(module):
    """
    Create a test user before running the tests (if not already exists).
    """
    user_data = {
        "id": USER_ID,
        "first_name": "Test",
        "last_name": "User",
        "birthday": "2000-01-01",
        "marital_status": "single"
    }

    # Try to create the user (it's okay if already exists)
    try:
        response = requests.post(f"{BASE_URL}/users", json=user_data)
        assert response.status_code in [200, 201, 409]  # 409 = conflict / already exists
    except Exception as e:
        print("⚠️ Failed to create test user:", e)

def test_add_cost():
    """
    Test the POST /api/add endpoint for adding a new cost item.
    This test sends a valid cost object and checks that the server responds with 201,
    and that the response contains the correct data.
    """
    cost_data = {
        "description": "milk 9",
        "category": "food",
        "userid": USER_ID,
        "sum": 8,
    }

    response = requests.post(f"{BASE_URL}/add", json=cost_data)

    assert response.status_code == 201
    data = response.json()
    assert data["description"] == "milk 9"
    assert data["category"] == "food"
    assert data["userid"] == USER_ID
    assert data["sum"] == 8
