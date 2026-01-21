function App() {
    const { Container, Row, Col } = ReactBootstrap;
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <UserTodoApp />
                </Col>
            </Row>
        </Container>
    );
}

function UserTodoApp() {
    const [users, setUsers] = React.useState(null);
    const [selectedUserId, setSelectedUserId] = React.useState(null);

    React.useEffect(() => {
        fetch('/users')
            .then((r) => r.json())
            .then(setUsers);
    }, []);

    const onNewUser = React.useCallback(
        (newUser) => {
            setUsers([...users, newUser]);
        },
        [users],
    );

    if (users === null) return 'Loading users...';

    return (
        <React.Fragment>
            <h2 className="text-center mb-4">Todo App by User</h2>
            <AddUserForm onNewUser={onNewUser} />
            {users.length === 0 ? (
                <p className="text-center">No users yet! Add one above!</p>
            ) : (
                <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    onSelectUser={setSelectedUserId}
                />
            )}
            {selectedUserId && (
                <UserTodoList
                    key={selectedUserId}
                    userId={selectedUserId}
                    userName={users.find((u) => u.id === selectedUserId)?.name}
                />
            )}
        </React.Fragment>
    );
}

function UserSelector({ users, selectedUserId, onSelectUser }) {
    const { Form } = ReactBootstrap;

    return (
        <Form.Group className="mb-3">
            <Form.Label>Select User:</Form.Label>
            <Form.Control
                as="select"
                value={selectedUserId || ''}
                onChange={(e) => onSelectUser(e.target.value)}
            >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}

function UserTodoList({ userId, userName }) {
    const [items, setItems] = React.useState(null);

    React.useEffect(() => {
        fetch(`/items?userId=${userId}`)
            .then((r) => r.json())
            .then(setItems);
    }, [userId]);

    const onNewItem = React.useCallback(
        (newItem) => {
            setItems([...items, newItem]);
        },
        [items],
    );

    const onItemUpdate = React.useCallback(
        (item) => {
            const index = items.findIndex((i) => i.id === item.id);
            setItems([
                ...items.slice(0, index),
                item,
                ...items.slice(index + 1),
            ]);
        },
        [items],
    );

    const onItemRemoval = React.useCallback(
        (item) => {
            const index = items.findIndex((i) => i.id === item.id);
            setItems([...items.slice(0, index), ...items.slice(index + 1)]);
        },
        [items],
    );

    if (items === null) return 'Loading...';

    return (
        <div className="mt-4">
            <h4>{userName}'s Todos</h4>
            <AddItemForm onNewItem={onNewItem} userId={userId} />
            {items.length === 0 && (
                <p className="text-center">
                    No items yet for {userName}! Add one above!
                </p>
            )}
            {items.map((item) => (
                <ItemDisplay
                    item={item}
                    key={item.id}
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}
        </div>
    );
}

function AddUserForm({ onNewUser }) {
    const { Form, InputGroup, Button } = ReactBootstrap;

    const [newUserName, setNewUserName] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const submitNewUser = (e) => {
        e.preventDefault();
        setSubmitting(true);
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify({ name: newUserName }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((r) => r.json())
            .then((user) => {
                onNewUser(user);
                setSubmitting(false);
                setNewUserName('');
            });
    };

    return (
        <Form onSubmit={submitNewUser}>
            <InputGroup className="mb-3">
                <Form.Control
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    type="text"
                    placeholder="New User Name"
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Append>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!newUserName.length}
                        className={submitting ? 'disabled' : ''}
                    >
                        {submitting ? 'Adding...' : 'Add User'}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    );
}

function AddItemForm({ onNewItem, userId }) {
    const { Form, InputGroup, Button } = ReactBootstrap;

    const [newItem, setNewItem] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const submitNewItem = (e) => {
        e.preventDefault();
        setSubmitting(true);
        fetch('/items', {
            method: 'POST',
            body: JSON.stringify({ name: newItem, userId: userId }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((r) => r.json())
            .then((item) => {
                onNewItem(item);
                setSubmitting(false);
                setNewItem('');
            });
    };

    return (
        <Form onSubmit={submitNewItem}>
            <InputGroup className="mb-3">
                <Form.Control
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    type="text"
                    placeholder="New Item"
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Append>
                    <Button
                        type="submit"
                        variant="success"
                        disabled={!newItem.length}
                        className={submitting ? 'disabled' : ''}
                    >
                        {submitting ? 'Adding...' : 'Add Item'}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    );
}

function ItemDisplay({ item, onItemUpdate, onItemRemoval }) {
    const { Container, Row, Col, Button } = ReactBootstrap;

    const toggleCompletion = () => {
        fetch(`/items/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: item.name,
                completed: !item.completed,
                user_id: item.user_id,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((r) => r.json())
            .then(onItemUpdate);
    };

    const removeItem = () => {
        fetch(`/items/${item.id}`, { method: 'DELETE' }).then(() =>
            onItemRemoval(item),
        );
    };

    return (
        <Container fluid className={`item ${item.completed && 'completed'}`}>
            <Row>
                <Col xs={1} className="text-center">
                    <Button
                        className="toggles"
                        size="sm"
                        variant="link"
                        onClick={toggleCompletion}
                        aria-label={
                            item.completed
                                ? 'Mark item as incomplete'
                                : 'Mark item as complete'
                        }
                    >
                        <i
                            className={`far ${
                                item.completed ? 'fa-check-square' : 'fa-square'
                            }`}
                        />
                    </Button>
                </Col>
                <Col xs={10} className="name">
                    {item.name}
                </Col>
                <Col xs={1} className="text-center remove">
                    <Button
                        size="sm"
                        variant="link"
                        onClick={removeItem}
                        aria-label="Remove Item"
                    >
                        <i className="fa fa-trash text-danger" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
