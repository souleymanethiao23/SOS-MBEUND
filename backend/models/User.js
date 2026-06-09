const db = require('../config/db');

const User = {

  findByEmail: async (email) => {
    const [rows] = await db.execute(
      'SELECT * FROM utilisateur WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  findById: async (id) => {
    const [rows] = await db.execute(
      'SELECT id_utilisateur, nom_utilisateur, email, role FROM utilisateur WHERE id_utilisateur = ?',
      [id]
    );
    return rows[0] || null;
  },

};

module.exports = User;