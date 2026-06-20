const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. Récupérer le token du header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token manquant"
            });
        }

        const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token invalide"
            });
        }

        // 2. Vérifier le token avec la clé secrète (depuis .env)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attacher les infos de l'utilisateur à la requête
        req.user = {
            id: decodedToken.id_utilisateur,
            email: decodedToken.email,
            role: decodedToken.role,
            zone: decodedToken.zone_competence
            
        };

        // 4. Passer à la route suivante
        next();

    } catch (error) {
        console.error("Erreur d'authentification:", error.message);
        res.status(401).json({
            success: false,
            message: "Token invalide ou expiré"
        });
    }
};