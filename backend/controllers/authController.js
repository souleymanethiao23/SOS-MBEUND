const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  try {
    const { nom_utilisateur, email, telephone, password, role, zone_competence } = req.body;

    if (!nom_utilisateur || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe sont obligatoires' });
    }

    const [existingUsers] = await db.query(
      'SELECT id_utilisateur FROM utilisateur WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Cet email est deja utilise' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO utilisateur
        (nom_utilisateur, email, telephone, mot_de_passe, role, zone_competence)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nom_utilisateur,
        email,
        telephone || null,
        hashedPassword,
        role || 'citoyen',
        zone_competence || null
      ]
    );

    return res.status(201).json({
      message: 'Utilisateur cree avec succes',
      user: {
        id_utilisateur: result.insertId,
        nom_utilisateur,
        email,
        telephone: telephone || null,
        role: role || 'citoyen',
        zone_competence: zone_competence || null
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe obligatoires' });
    }

    const [users] = await db.query(
      'SELECT * FROM utilisateur WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      {
        id_utilisateur: user.id_utilisateur,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret_dev',
      { expiresIn: '1d' }
    );

    return res.json({
      message: 'Connexion reussie',
      token,
      user: {
        id_utilisateur: user.id_utilisateur,
        nom_utilisateur: user.nom_utilisateur,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
        zone_competence: user.zone_competence
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
