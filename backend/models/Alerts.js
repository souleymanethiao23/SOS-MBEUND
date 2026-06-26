const db = require('../config/db');
const Notification = require('./notification');

const Alert = {

  // Créer un signalement
  create: async ({ telephone, niveau_gravite, description, photo_url, zone }) => {
    // Démarrer une transaction pour garantir que tout s'enregistre bien
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // 1. Insérer le signalement
      const [result] = await connection.execute(
        `INSERT INTO Signalement (telephone, niveau_gravite, description, photo_url, zone, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [telephone, niveau_gravite, description, photo_url, zone]
      );
      
      const idSignalement = result.insertId;

      // 2. Créer une notification pour les autorités
      // On construit un message clair pour le dashboard
      const messageNotif = `🚨 Nouveau signalement reçu !\nZone : ${zone}\nGravité : ${niveau_gravite}\nTéléphone : ${telephone}`;
      
      // On insère dans la table notification (id_utilisateur = NULL car c'est une notification générale)
      await connection.execute(
        `INSERT INTO notification (telephone, message, lu, created_at, id_utilisateur)
         VALUES (?, ?, 0, NOW(), ?)`,
        [telephone, messageNotif, 1]
      );

      // 3. Valider la transaction
      await connection.commit();
      
      return idSignalement;

    } catch (error) {
      // En cas d'erreur, on annule tout
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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

  // Supprimer un signalement
  delete: async (id) => {
    await db.execute(
      'DELETE FROM Signalement WHERE id_signalisation = ?',
      [id]
    );
  },

};

module.exports = Alert;