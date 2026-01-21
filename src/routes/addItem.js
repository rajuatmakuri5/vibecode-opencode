const db = require('../persistence');
const { v4: uuid } = require('uuid');

module.exports = async (req, res) => {
    const { name, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const item = {
        id: uuid(),
        name: name,
        completed: false,
        user_id: userId,
    };

    await db.storeItem(item);
    res.send(item);
};
