# Cost Manager API

> ⚠️ This project is **still under development** and is not yet fully complete.

This is a RESTful web service built with **Node.js**, **Express**, and **MongoDB (via Mongoose)** for managing and tracking user expenses.

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
---

Feel free to explore and contribute once the project is completed!