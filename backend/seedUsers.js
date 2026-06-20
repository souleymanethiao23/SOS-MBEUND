require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./config/db');

// Utilisateurs de test
const users = [
  {
    nom_utilisateur: 'chef pompier',
    email: 'pompier@sos-mbeund.sn',
    mot_de_passe: 'pompier123456',
    role: 'autorite',
    zone_competence: 'Nationale'
  },
  {
    nom_utilisateur: 'Autorité Dakar',
    email: 'dakar@sos-mbeund.sn',
    mot_de_passe: 'dakar123456',
    role: 'autorite',
    zone_competence: 'Dakar'
  },
  {
    nom_utilisateur: 'Autorité Thiès',
    email: 'thies@sos-mbeund.sn',
    mot_de_passe: 'thies123456',
    role: 'autorite',
    zone_competence: 'Thiès'
  },
  {
    nom_utilisateur: 'Autorité Saint-Louis',
    email: 'saintlouis@sos-mbeund.sn',
    mot_de_passe: 'saintlouis123456',
    role: 'autorite',
    zone_competence: 'Saint-Louis'
  }
];

// Hasher le mot de passe et insérer
async function seedUsers() {
  let count = 0;

  for (const user of users) {
    try {
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(user.mot_de_passe, 10);

      const sql = `INSERT INTO utilisateur 
                   (nom_utilisateur, email, mot_de_passe, role, zone_competence, created_at) 
                   VALUES (?, ?, ?, ?, ?, NOW())`;
      
      const values = [
        user.nom_utilisateur,
        user.email,
        hashedPassword,
        user.role,
        user.zone_competence
      ];

      try {
        const [result] = await db.query(sql, values);
        count++;
        console.log(`✅ Utilisateur ${count}/${users.length} créé: ${user.email} (${user.role})`);
        console.log(`   Identifiants: ${user.email} / ${user.mot_de_passe}`);
      } catch (err) {
        // Si l'utilisateur existe déjà, ne pas afficher d'erreur
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`⚠️  Utilisateur ${user.email} existe déjà`);
        } else {
          console.error(`❌ Erreur lors de la création de ${user.email}:`, err.message);
        }
      }

      // Fermer après le dernier
      if (count === users.length) {
        setTimeout(() => {
          console.log('\n✨ Seed utilisateurs terminé!');
          process.exit(0);
        }, 500);
      }
    } catch (error) {
      console.error(`❌ Erreur bcrypt pour ${user.email}:`, error.message);
    }
  }
}

// Vérifier connexion BD
db.query('SELECT 1')
  .then(() => {
    console.log('🔐 Création des comptes utilisateurs de test...\n');
    seedUsers();
  })
  .catch((err) => {
    console.error('❌ Connexion à la BD échouée:', err.message);
    process.exit(1);
  });
