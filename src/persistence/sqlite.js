const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = process.env.SQLITE_DB_LOCATION || './todo.db';

let db, dbAll, dbRun;

function init() {
    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    return new Promise((acc, rej) => {
        db = new sqlite3.Database(location, (err) => {
            if (err) return rej(err);

            if (process.env.NODE_ENV !== 'test')
                console.log(`Using sqlite database at ${location}`);

            db.run(
                'CREATE TABLE IF NOT EXISTS users (id varchar(36), name varchar(255))',
                (err, result) => {
                    if (err) return rej(err);

                    db.run(
                        'CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean, user_id varchar(36), FOREIGN KEY(user_id) REFERENCES users(id))',
                        (err, result) => {
                            if (err) return rej(err);
                            acc();
                        },
                    );
                },
            );
        });
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        db.close((err) => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM todo_items', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map((item) =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function getItemsByUser(userId) {
    return new Promise((acc, rej) => {
        db.all(
            'SELECT * FROM todo_items WHERE user_id = ?',
            [userId],
            (err, rows) => {
                if (err) return rej(err);
                acc(
                    rows.map((item) =>
                        Object.assign({}, item, {
                            completed: item.completed === 1,
                        }),
                    ),
                );
            },
        );
    });
}

async function getItem(id) {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map((item) =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}

async function storeItem(item) {
    return new Promise((acc, rej) => {
        db.run(
            'INSERT INTO todo_items (id, name, completed, user_id) VALUES (?, ?, ?, ?)',
            [item.id, item.name, item.completed ? 1 : 0, item.user_id],
            (err) => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        db.run(
            'UPDATE todo_items SET name=?, completed=?, user_id=? WHERE id = ?',
            [item.name, item.completed ? 1 : 0, item.user_id, id],
            (err) => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function removeItem(id) {
    return new Promise((acc, rej) => {
        db.run('DELETE FROM todo_items WHERE id = ?', [id], (err) => {
            if (err) return rej(err);
            acc();
        });
    });
}

async function getUsers() {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function storeUser(user) {
    return new Promise((acc, rej) => {
        db.run(
            'INSERT INTO users (id, name) VALUES (?, ?)',
            [user.id, user.name],
            (err) => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function getUser(id) {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM users WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(rows[0]);
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItemsByUser,
    getItem,
    storeItem,
    updateItem,
    removeItem,
    getUsers,
    storeUser,
    getUser,
};
