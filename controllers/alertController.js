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