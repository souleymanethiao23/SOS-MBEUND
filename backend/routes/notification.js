const express = require('express');
const router = express.Router();
const Notification = require('../models/notification'); // <-- On importe le modèle

// Route GET : Récupérer toutes les notifications (pour le dashboard)
router.get('/', async (req, res) => {
  try {
    // On utilise la méthode findAll() définie dans votre modèle
    const notifications = await Notification.findAll();
    res.json({ data: notifications });
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route POST : Créer une notification
router.post('/', async (req, res) => {
  try {
    const { telephone, message, id_utilisateur } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Le message est obligatoire' });
    }

    // On utilise la méthode create() définie dans votre modèle
    const id_notification = await Notification.create({
      telephone: telephone || null,
      message: message,
      id_utilisateur: id_utilisateur || null
    });

    res.status(201).json({ 
      success: true, 
      message: 'Notification enregistrée',
      id_notification: id_notification 
    });

  } catch (error) {
    console.error('Erreur lors de l\'insertion de la notification:', error);
    res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
  }
});

// Route GET : Récupérer les notifications d'un utilisateur spécifique
router.get('/:id_utilisateur', async (req, res) => {
  const notifications = await Notification.findByUserId(req.params.id_utilisateur);
  res.json({ data: notifications });
});

module.exports = router;