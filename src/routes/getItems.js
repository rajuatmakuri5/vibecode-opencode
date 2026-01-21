const db = require('../persistence');

module.exports = async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        const items = await db.getItemsByUser(userId);
        res.send(items);
    } else {
        const items = await db.getItems();
        res.send(items);
    }
};
