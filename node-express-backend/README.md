# Node Express Backend

REST API backend built with **Express** and **MongoDB** (Mongoose). Provides user CRUD endpoints with request logging middleware.

## Tech Stack

- **Express** 4 – web framework
- **Mongoose** 8 – MongoDB ODM
- **dotenv** – environment variables
- **nodemon** – dev server with auto-reload (dev dependency)

## Project Structure

```
node-express-backend/
├── controllers/
│   └── userController.js   # User CRUD logic
├── middlewares/
│   └── logger.js           # Request logging
├── models/
│   └── user.js             # User schema (name, email, createdAt)
├── routes/
│   └── userRoutes.js       # /users routes
├── index.js                 # App entry, DB connection, server
├── package.json
├── .env.example             # Example env vars – copy to .env
├── .env                     # Not committed – your local config
└── README.md
```

## Prerequisites

- **Node.js** (v16+)
- **MongoDB** (local or Atlas connection string)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example file and add your values:

```bash
cp .env.example .env
```

Edit `.env` and set:

| Variable | Description                                                                                 |
| -------- | ------------------------------------------------------------------------------------------- |
| `PORT`   | Server port (default: 4000)                                                                 |
| `DB_URL` | MongoDB connection string (e.g. `mongodb://localhost:27017/your-db-name` or your Atlas URI) |

Do not commit `.env`; it is listed in `.gitignore`.

### 3. Run the server

**Development** (with nodemon):

```bash
npm run dev
```

**Production** (run once):

```bash
node index.js
```

Server runs at `http://localhost:4000` (or the port in `.env`).

## API Endpoints

### Health

| Method | Path | Description      |
| ------ | ---- | ---------------- |
| GET    | `/`  | API status check |

### Users

| Method | Path            | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/users`        | List all users (newest first) |
| POST   | `/users`        | Create user (`name`, `email`) |
| PUT    | `/users/:email` | Update user by email          |
| DELETE | `/users/:email` | Delete user by email          |

**POST /users** – body:

```json
{ "name": "John Doe", "email": "john@example.com" }
```

**PUT /users/:email** – body (both optional):

```json
{ "name": "Jane Doe", "email": "jane@example.com" }
```

Responses use standard HTTP status codes (e.g. 200, 201, 400, 404).

## User Model

- `name` (String, required)
- `email` (String, required, unique)
- `createdAt` (Date, default: now)
