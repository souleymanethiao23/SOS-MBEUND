
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configurer multer pour le stockage des fichiers 


const { 
    getAlerts, 
    getAlertById, 
    createAlert, 
    updateAlertStatus, 
    deleteAlert,
    getStats
} = require('../controllers/alertController');

// Routes publiques (habitants)
router.post('/', upload.single('photo'), createAlert);
router.get('/stats/public', getStats);

// Routes protégées (autorités uniquement)
router.get('/', authMiddleware, getAlerts);
router.get('/:id', authMiddleware, getAlertById);
router.put('/:id/status', authMiddleware, updateAlertStatus);
router.delete('/:id', authMiddleware, deleteAlert);



module.exports = router;
