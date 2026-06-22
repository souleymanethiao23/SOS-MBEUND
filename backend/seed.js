require('dotenv').config();
const db = require('./config/db');

// Données de démonstration
const seedData = [
  {
    telephone: '221771234567',
    niveau_gravite: 'critique',
    description: 'Inondations massives. L\'eau atteint les toitures des maisons. Plusieurs familles évacuées.',
    zone: 'Pikine',
    statut: 'en cours',
    photo_url: null
  },
  {
    telephone: '221762345678',
    niveau_gravite: 'eleve',
    description: 'Route principale complètement submergée. Circulation impossible depuis ce matin.',
    zone: 'Guédiawaye',
    statut: 'en cours',
    photo_url: null
  },
  {
    telephone: '221783456789',
    niveau_gravite: 'moyen',
    description: 'Zone de commerce inondée. Les magasins ferment progressivement.',
    zone: 'Thiaroye',
    statut: 'resolu',
    photo_url: null
  },
  {
    telephone: '221771234567',
    niveau_gravite: 'faible',
    description: 'Accumulation d\'eau dans la zone résidentielle. Situation sous contrôle.',
    zone: 'Mbao',
    statut: 'en cours',
    photo_url: null
  },
  {
    telephone: '221707654321',
    niveau_gravite: 'eleve',
    description: 'Inondation croissante. Beaucoup de déplacés. Intervention urgente requise.',
    zone: 'Yeumbeul',
    statut: 'resolu',
    photo_url: null
  },
  {
    telephone: '221761111111',
    niveau_gravite: 'moyen',
    description: 'Dégâts importants. Plusieurs bâtiments affectés. Situation en amélioration.',
    zone: 'Rufisque',
    statut: 'en attente',
    photo_url: null
  },
  {
    telephone: '221772222222',
    niveau_gravite: 'faible',
    description: 'Petite accumulation d\'eau. Aucun dégât majeur signalé.',
    zone: 'Grand Yoff',
    statut: 'resolu',
    photo_url: null
  },
  {
    telephone: '221773333333',
    niveau_gravite: 'critique',
    description: 'Situation d\'urgence. Infrastructure endommagée. Aide humanitaire nécessaire immédiatement.',
    zone: 'Parcelles Assainies',
    statut: 'en attente',
    photo_url: null
  },
  {
    telephone: '221774444444',
    niveau_gravite: 'moyen',
    description: 'Zone inondée. Les habitants commencent à évacuer leurs biens.',
    zone: 'Dakar Médina',
    statut: 'en cours',
    photo_url: null
  },
  {
    telephone: '221775555555',
    niveau_gravite: 'eleve',
    description: 'Inondation significative. Transport public affecté.',
    zone: 'Thiès',
    statut: 'en attente',
    photo_url: null
  }
];

// Insérer les données
function insertSeedData() {
  let count = 0;

  seedData.forEach((data) => {
    const sql = `INSERT INTO signalement 
                 (telephone, niveau_gravite, description, zone, statut, photo_url, created_at, updated_at) 
                 VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    
    const values = [
      data.telephone,
      data.niveau_gravite,
      data.description,
      data.zone,
      data.statut,
      data.photo_url
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(`❌ Erreur insertion alerte "${data.zone}":`, err.message);
      } else {
        count++;
        console.log(`✅ Alerte ${count}/${seedData.length} créée: ${data.zone} (${data.statut})`);
      }

      // Fermer la connexion après la dernière insertion
      if (count === seedData.length) {
        setTimeout(() => {
          console.log('\n✨ Seed completed! Toutes les alertes de démo ont été créées.');
          process.exit(0);
        }, 500);
      }
    });
  });
}

// Vérifier que la BD est accessible
db.ping((err) => {
  if (err) {
    console.error('❌ Impossible de se connecter à la base de données:', err.message);
    process.exit(1);
  }
  
  console.log('🗄️  Connexion à la BD établie. Création des données de démonstration...\n');
  insertSeedData();
});
