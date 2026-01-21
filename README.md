# Todo App with User Management

A modern Todo application built with Node.js, Express, and React that allows users to create separate todo lists for different people.

## Features

-   **User Management**: Create multiple users and organize todos by person
-   **Separate Todo Lists**: Each user has their own independent todo list
-   **Modern UI**: Beautiful purple-pink gradient interface with smooth animations
-   **Full CRUD Operations**: Create, read, update, and delete todo items
-   **Responsive Design**: Works on desktop and mobile devices
-   **SQLite Database**: Lightweight database for data persistence

## Installation & Setup

### Prerequisites

-   Node.js (version 14 or higher)
-   npm or yarn

### Installation Steps

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd getting-started-app
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the application**

    ```bash
    npm start
    ```

4. **Access the application**
   Open your browser and navigate to: `http://localhost:3000`

## Usage

1. **Create Users**: Use the "Add User" form to create new users
2. **Select User**: Choose a user from the dropdown to view their todos
3. **Manage Todos**: Add, complete, or delete todo items for the selected user
4. **Switch Users**: Select different users to view and manage their separate todo lists

## API Endpoints

### Users

-   `GET /users` - Get all users
-   `POST /users` - Create a new user
    ```json
    {
        "name": "John Doe"
    }
    ```

### Todo Items

-   `GET /items?userId=<userId>` - Get todos for a specific user
-   `POST /items` - Create a new todo item
    ```json
    {
        "name": "Learn React",
        "userId": "user-uuid"
    }
    ```
-   `PUT /items/:id` - Update a todo item
    ```json
    {
        "name": "Updated task",
        "completed": true,
        "user_id": "user-uuid"
    }
    ```
-   `DELETE /items/:id` - Delete a todo item

## Development

### Running in Development Mode

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

### Code Formatting

```bash
npm run prettify
```

## Project Structure

```
├── src/
│   ├── index.js              # Main application entry point
│   ├── persistence/          # Database layer
│   │   ├── index.js
│   │   ├── sqlite.js         # SQLite database implementation
│   │   └── mysql.js          # MySQL database implementation
│   ├── routes/               # API routes
│   │   ├── addItem.js
│   │   ├── deleteItem.js
│   │   ├── getItems.js
│   │   ├── updateItem.js
│   │   ├── addUser.js
│   │   └── getUsers.js
│   └── static/               # Frontend assets
│       ├── index.html
│       ├── css/
│       │   ├── styles.css
│       │   └── bootstrap.min.css
│       └── js/
│           ├── app.js        # React application
│           └── react-*.js     # React libraries
├── spec/                     # Test files
├── package.json
└── README.md
```

## Database

The application uses SQLite by default for simplicity. The database file (`todo.db`) is created automatically when the application first starts.

## License

MIT License
