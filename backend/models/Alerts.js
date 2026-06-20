const db = require('../config/db');

const Alert = {

  // Créer un signalement
 create: async ({ telephone, niveau_gravite, description, photo_url, zone }) => {
    const [result] = await db.execute(
      `INSERT INTO Signalement (telephone, niveau_gravite, description, photo_url, zone)
       VALUES (?, ?, ?, ?, ?)`,
      [telephone, niveau_gravite, description, photo_url, zone]
    );
    return result.insertId;
  },

  // Récupérer tous les signalements (vue admin)
  findAll: async () => {
    const [rows] = await db.execute(
      'SELECT * FROM Signalement ORDER BY created_at DESC'
    );
    return rows;
  },

  // Récupérer un signalement par ID
  findById: async (id) => {
    const [alert] = await db.execute(
      'SELECT * FROM Signalement WHERE id_signalisation = ?',
      [id]
    );
    return alert[0] || null;
  },

  // Mettre à jour le statut
  updateStatus: async (id, statut) => {
    await db.execute(
      'UPDATE Signalement SET statut = ? WHERE id_signalisation = ?',
      [statut, id]
    );
  },

};

module.exports = Alert;