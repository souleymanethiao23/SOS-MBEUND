
const Notification = require('../models/notification');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json({ data: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.markAsRead(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};