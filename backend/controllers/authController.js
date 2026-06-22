const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe obligatoires'
      });
    }

    const [users] = await db.query(
      'SELECT * FROM utilisateur WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      });
    }

    if (user.role !== 'autorite' && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acces reserve aux autorites'
      });
    }

    const token = jwt.sign(
      {
        id: user.id_utilisateur,
        email: user.email,
        role: user.role,
        zone: user.zone_competence
      },
      process.env.JWT_SECRET || 'secret_dev',
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      message: 'Connexion reussie',
      token,
      user: {
        id: user.id_utilisateur,
        name: user.nom_utilisateur,
        email: user.email,
        role: user.role,
        zone: user.zone_competence
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};
