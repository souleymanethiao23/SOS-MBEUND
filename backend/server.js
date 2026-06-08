//charger les variables d'environnement 

require ('dotenv').config();

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


// Routes à importer quand les autres les aurons creer
/*
importer les routes 
const authRoutes = require('./routes/auth');
const alertRoutes = require('./routes/alerts);

utiliser les routes 
app.use('/api', authRoutes);
app.use ('/api', alertRoutes )

*/

//je démarre le serveur

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Le serveur vient de demarrer sur http://localhost:${PORT}`)
});

