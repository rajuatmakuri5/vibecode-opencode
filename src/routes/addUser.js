const { v4: uuidv4 } = require('uuid');
const db = require('../persistence');

module.exports = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const user = {
        id: uuidv4(),
        name: name,
    };

    await db.storeUser(user);

    res.status(201).json(user);
};
