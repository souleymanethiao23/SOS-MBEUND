//charger les variables d'environnement 
require('dotenv').config({ path: '../.env' });
console.log('JWT_SECRET au démarrage =', process.env.JWT_SECRET);

// les dépendances 

const express = require('express');
const cors = require('cors');

//initialiser l'app
const app  = express();

// Middleware pour les api 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./config/db');


// Routes à importer
// Monter les routes d'alerte (habitants/autorités)
const alertRoutes = require('./routes/alert');
const authRoutes = require('./routes/auth');

// Monter les routeurs
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);

//je démarre le serveur

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Le serveur vient de demarrer sur http://localhost:${PORT}`)
});

