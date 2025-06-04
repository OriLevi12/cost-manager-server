# Cost Manager API

> ⚠️ This project is **still under development** and is not yet fully complete.

This is a RESTful web service built with **Node.js**, **Express**, and **MongoDB (via Mongoose)** for managing and tracking user expenses.

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

## ▶️ Running the Server

```bash
npm start
```

The server will run at:  
```
http://localhost:3000
```

## 🧪 Testing

The project includes comprehensive test coverage using Python and Pytest. Tests cover:
- User operations (retrieval, validation)
- Cost management (addition, validation)
- Report generation
- API error handling
- Data validation

To run the tests:
```bash
# Make sure the server is running first
npm start

# In a new terminal, run the tests
pytest test_endpoints.py -v
```

## 📬 API Endpoints

| Method | Route             | Description                             |
|--------|------------------|-----------------------------------------|
| POST   | `/api/add`        | Add a new cost item                     |
| GET    | `/api/report`     | Get costs for user by month & year      |
| GET    | `/api/users/:id`  | Get user details and total costs        |
| GET    | `/api/about`      | Get development team info               |

## 🧪 Example Request

```json
POST /api/add
{
  "description": "pizza",
  "category": "food",
  "userid": 123123,
  "sum": 50,
  "date": "2025-11-05T14:00:00.000Z"
}
```

## 📝 Code Quality

- Comprehensive JSDoc documentation
- Consistent code style
- Error handling and validation
- Automated testing suite
- Clean and maintainable codebase

---

Feel free to explore and contribute once the project is completed!