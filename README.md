# Cost Manager API

This is a RESTful web service built with **Node.js**, **Express**, and **MongoDB (via Mongoose)** for managing and tracking user expenses.

## 🌐 Live Demo

The API is deployed and available at the following endpoints:
- Development team info: [https://cost-manager-server.onrender.com/api/about](https://cost-manager-server.onrender.com/api/about)
- Add new cost: [https://cost-manager-server.onrender.com/api/add](https://cost-manager-server.onrender.com/api/add) (POST request)
- Get monthly report: [https://cost-manager-server.onrender.com/api/report](https://cost-manager-server.onrender.com/api/report)
- Get user details: [https://cost-manager-server.onrender.com/api/users/:id](https://cost-manager-server.onrender.com/api/users/:id)

Note: POST endpoints need to be tested using tools like Postman or curl.

## 👥 Project Owners

This project was developed by:
- **Ori Levi** - Full Stack Developer
- **Noam Levi** - Full Stack Developer

## 🚀 Features

- Add new cost items
- Get a monthly report grouped by category
- Retrieve user information with total costs
- View development team info

## 📦 Technologies

- Node.js + Express
- MongoDB Atlas (Mongoose ODM)
- JSDoc for documentation
- Postman for testing the API
- Python + Pytest for automated testing

## 🛠️ Installation

```bash
git clone https://github.com/OriLevi12/cost-manager-server.git
cd cost-manager-server
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
MONGO_ORI_NOAM=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

Note: The server will run on port 3000 by default. If you need to use a different port, you can set it using the `PORT` environment variable.

## ▶️ Running the Server

```bash
npm start
```

The server will run at:  
```
http://localhost:3000
```

## 🧪 Testing

The project includes automated tests written in Python using the `requests` library. The tests verify all API endpoints using the following test data:

- Test user ID: 123123 (Yossi Einav)
- Test cost item: "milk 9" in the "food" category with sum of 8
- Test date: June 2025
- Expected team members: Ori Levi and Noam Levi

The tests verify:
- Adding new cost items (`/api/add`)
- Retrieving monthly reports (`/api/report`)
- Getting user details and total costs (`/api/users/:id`)
- Fetching development team information (`/api/about`)

To run the tests:
```bash
# Make sure the server is running first
npm start

# In a new terminal, run the tests
pytest test_endpoints.py -v
```

Note: The tests assume the existence of a user with ID 123123 in the database. Make sure this user exists before running the tests.

## 📬 API Endpoints

| Method | Route             | Description                             |
|--------|------------------|-----------------------------------------|
| POST   | `/api/add`        | Add a new cost item                     |
| GET    | `/api/report`     | Get costs for user by month & year      |
| GET    | `/api/users/:id`  | Get user details and total costs        |
| GET    | `/api/about`      | Get development team info               |

## 🧪 Example Request

```bash
# Using curl
curl -X POST https://cost-manager-server.onrender.com/api/add \
  -H "Content-Type: application/json" \
  -d '{
    "description": "pizza",
    "category": "food",
    "userid": 123123,
    "sum": 50,
    "date": "2025-11-05T14:00:00.000Z"
  }'
```

## 📝 Code Quality

- Comprehensive JSDoc documentation
- Consistent code style
- Error handling and validation
- Automated testing suite
- Clean and maintainable codebase

---

Feel free to explore and contribute to the project!