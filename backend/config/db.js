const mysql = require('mysql2');

//Connexion à mysql 
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'signalement_db'
});

db.connect((err) =>{
    if (err) {
        console.error('Erreur de connexion à MysSQL :', err);
        return;
    }
    console.log('connexion reussie à la base de données signalement_db');
});

module.exports = db; 
