exports.getAlerts = (req, res) => {
  res.status(200).json({
    message: "Liste des alertes récupérée avec succès",
    data: []
  });
};




add alerts controller