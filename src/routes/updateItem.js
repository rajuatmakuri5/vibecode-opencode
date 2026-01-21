const db = require('../persistence');

module.exports = async (req, res) => {
    await db.updateItem(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
        user_id: req.body.user_id,
    });
    const item = await db.getItem(req.params.id);
    res.send(item);
};
