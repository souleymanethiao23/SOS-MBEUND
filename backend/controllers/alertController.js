const Alert = require('../models/Alerts');

// Récupérer toutes les alertes
exports.getAlerts = async (req, res) => {
    try {
        const alertes = await Alert.findAll();
        res.status(200).json({ success: true, data: alertes });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Récupérer une alerte par ID
exports.getAlertById = async (req, res) => {
    try {
        const { id } = req.params;
        const alerte = await Alert.findById(id);
        
        if (!alerte) {
            return res.status(404).json({ success: false, message: "Signalement non trouvé" });
        }
        res.status(200).json({ success: true, data: alerte });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Créer une alerte (utilise la méthode create du modèle)
exports.createAlert = async (req, res) => {
    try {
        const {
            telephone,
            niveau_gravite,
            description,
            zone,
            statut = 'en attente',
            id_utilisateur = null,
            id_notification = null
        } = req.body;
        const photo_url = req.file ? req.file.path : null;

        // Appeler le modèle qui gère la transaction et la notification
        const idSignalement = await Alert.create({
            telephone,
            niveau_gravite,
            description,
            photo_url,
            zone
        });

        res.status(201).json({
            success: true,
            message: "Alerte créée avec succès",
            data: { id: idSignalement }
        });

    } catch (error) {
        console.error('Erreur lors de la création de l\'alerte:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mettre à jour le statut
exports.updateAlertStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        await Alert.updateStatus(id, statut);
        
        res.status(200).json({
            success: true,
            message: "Statut mis à jour avec succès",
            data: { id, statut }
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Supprimer une alerte (Contrôleur)
exports.deleteAlert = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Appeler la méthode delete du modèle Alert
        await Alert.delete(id);
        
        res.status(200).json({
            success: true,
            message: "Alerte supprimée avec succès"
        });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const total = await Alert.count();
        const resolues = await Alert.countResolues();

        res.status(200).json({
            success: true,
            data: {
                total,
                resolues
            }
        });

    } catch (error) {
        console.error('Erreur stats:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};