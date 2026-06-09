exports.getAlerts = (req, res) => {
    try {
        const alerts = [
            { id: 1, message: "Alerte 1", type: "info" },
            { id: 2, message: "Alerte 2", type: "warning" }
        ];

        res.status(200).json({
            success: true,
            data: alerts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
};

exports.createAlert = (req, res) => {
    try {
        const { zone_id, description, latitude, longitude, type_signalement } = req.body;
        const photo_url = req.file ? req.file.path : null;

        res.status(201).json({
            success: true,
            message: "Alert created successfully",
            data: { zone_id, description, latitude, longitude, type_signalement, photo_url }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateAlertStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: { id, statut }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};