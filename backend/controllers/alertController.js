const db = require('../config/db'); // Import de votre config

exports.getAlerts = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM signalement ORDER BY created_at DESC');
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAlertById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM signalement WHERE id_signalisation = ?`;
        const [results] = await db.query(sql, [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Signalement non trouvé" });
        }
        res.status(200).json({ success: true, data: results[0] });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

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

        const sql = `INSERT INTO signalement (telephone, niveau_gravite, description, photo_url, zone, statut, created_at, updated_at, id_utilisateur, id_notification)
                     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`;
        const values = [telephone, niveau_gravite, description, photo_url, zone, statut, id_utilisateur, id_notification];

        const [result] = await db.query(sql, values);
        
        res.status(201).json({
            success: true,
            message: "Alerte créée avec succès",
            data: {
                id: result.insertId,
                telephone,
                niveau_gravite,
                description,
                photo_url,
                zone,
                statut,
                id_utilisateur,
                id_notification
            }
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAlertStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const sql = `UPDATE signalement SET statut = ?, updated_at = NOW() WHERE id_signalisation = ?`;
        const [result] = await db.query(sql, [statut, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Alerte non trouvée" });
        }
        
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