const db = require('../config/db');

const Notification = {
  // Créer une notification
  create: async ({ telephone, message, id_utilisateur = null }) => {
    const [result] = await db.execute(
      `INSERT INTO notification (telephone, message, lu, created_at, id_utilisateur)
       VALUES (?, ?, 0, NOW(), ?)`,
      [telephone, message, id_utilisateur]
    );
    return result.insertId;
  },

  // Récupérer toutes les notifications (pour le dashboard)
  findAll: async () => {
    const [rows] = await db.execute(
      'SELECT * FROM notification ORDER BY created_at DESC'
    );
    return rows;
  },
  // Ajoutez ceci dans models/notification.js
  findByUserId: async (id_utilisateur) => {
    const [rows] = await db.execute(
      'SELECT * FROM notification WHERE id_utilisateur = ? ORDER BY created_at DESC',
      [id_utilisateur]
    );
    return rows;
  },

  // Récupérer les notifications non lues
  findUnread: async () => {
    const [rows] = await db.execute(
      'SELECT * FROM notification WHERE lu = 0 ORDER BY created_at DESC'
    );
    return rows;
  },

  // Marquer comme lue
  markAsRead: async (id) => {
    await db.execute(
      'UPDATE notification SET lu = 1 WHERE id_notification = ?',
      [id]
    );
  }
};

module.exports = Notification;