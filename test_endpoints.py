
import requests
from datetime import datetime

BASE_URL = "http://localhost:3000/api"
USER_ID = 123123  # Existing user in the DB: yossi einav

def test_add_cost():
    '''
    Test the POST /api/add endpoint for adding a new cost item.
    This test sends a valid cost object and checks that the server responds with 201,
    and that the response contains the correct data.
    '''
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

def test_get_report():
    '''
    Test the GET /api/report endpoint for retrieving monthly cost summary.
    This test verifies that the returned report contains the correct user ID,
    year, and month, and that the costs array is structured correctly.
    '''
    params = {
        "id": USER_ID,
        "year": 2025,
        "month": 6
    }

    response = requests.get(f"{BASE_URL}/report", params=params)

    assert response.status_code == 200
    data = response.json()

    assert data["userid"] == USER_ID
    assert data["year"] == 2025
    assert data["month"] == 6
    assert isinstance(data["costs"], list)

    found_description = any(
        any(item.get("description") == "milk 9" for item in category.get("food", []))
        if "food" in category else False
        for category in data["costs"]
    )
    assert found_description, "Expected description 'milk 9' not found in report"

def test_get_user_details():
    '''
    Test the GET /api/users/:id endpoint for retrieving user details and total cost.
    This test verifies that the correct user is returned, and that the 'total' field
    reflects the sum of all their cost entries.
    '''
    response = requests.get(f"{BASE_URL}/users/{USER_ID}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == USER_ID
    assert data["first_name"].lower() == "yossi"
    assert data["last_name"].lower() == "einav"
    assert "total" in data
    assert isinstance(data["total"], (int, float))
    assert data["total"] >= 8  # Assuming the previous cost exists

def test_get_about():
    '''
    Test the GET /api/about endpoint.
    This endpoint should return a list of team members, each with 'first_name' and 'last_name'.
    '''
    response = requests.get(f"{BASE_URL}/about")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) >= 2  # Expecting at least two members

    member = data[0]
    assert "first_name" in member
    assert "last_name" in member
    assert isinstance(member["first_name"], str)
    assert isinstance(member["last_name"], str)

    expected_names = [
        {"first_name": "Ori", "last_name": "Levi"},
        {"first_name": "Noam", "last_name": "Levi"}
    ]
    assert data == expected_names
