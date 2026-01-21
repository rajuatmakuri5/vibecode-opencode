# Todo List Application

A Node.js and React-based todo list application with SQLite/MySQL database support.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js) or yarn

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd vibecode-opencode
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on port 3000 and the server will automatically restart when files change.

### Production Mode

```bash
node src/index.js
```

## Database Configuration

The application supports two database options:

### SQLite (Default)

- Uses SQLite database stored in `./todo.db`
- No additional configuration needed
- Database is created automatically on first run

### MySQL (Optional)

Set the `MYSQL_HOST` environment variable to use MySQL instead of SQLite:

```bash
export MYSQL_HOST=your-mysql-host
export MYSQL_USER=your-username
export MYSQL_PASSWORD=your-password
export MYSQL_DB=your-database-name
```

## Available Scripts

- `npm run dev` - Start application in development mode with nodemon
- `npm test` - Run Jest tests
- `npm run prettify` - Format JavaScript files with Prettier

## Application Structure

- `src/index.js` - Main application entry point
- `src/routes/` - API route handlers
- `src/persistence/` - Database layer (SQLite/MySQL)
- `src/static/` - Frontend assets (React app, CSS, JS)

## API Endpoints

- `GET /` - Serves the main application
- `GET /items` - Get all todo items
- `POST /items` - Create a new todo item
- `PUT /items/:id` - Update a todo item
- `DELETE /items/:id` - Delete a todo item
- `GET /users` - Get all users
- `POST /users` - Create a new user

## Features

- Todo item management (create, read, update, delete)
- User management
- RESTful API
- Responsive React frontend
- SQLite database (with MySQL option)
- Automatic database table creation
- Graceful shutdown handling
