// back/src/migration/sync.js
import 'dotenv/config';
import { sequelize } from '../models/index.js';
import config from '../config/config.js';

/**
 * Initialise et synchronise la base de données
 * @param {Object} options - Options de synchronisation
 * @param {boolean} options.force - Si true, drop et recrée toutes les tables (DANGEREUX)
 * @param {boolean} options.alter - Si true, modifie les tables existantes pour matcher les modèles
 * @returns {Promise<Array>} Liste des tables synchronisées
 */
export async function initDatabase(options = {}) {
  const env = process.env.NODE_ENV || 'development';
  
  console.log(`🔄 Synchronisation de la base de données (${env})...`);
  
  // Test de connexion
  try {
    await sequelize.authenticate();
    console.log(`✅ Connecté à ${sequelize.config.host}/${sequelize.config.database}`);
  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error);
    throw error;
  }
  
  // 🛡️ PROTECTION CRITIQUE : En production, JAMAIS de force: true
  if (env === 'production') {
    if (options.force === true) {
      console.error('❌ ERREUR CRITIQUE: force: true INTERDIT en production !');
      process.exit(1);
    }
    
    try {
      await sequelize.sync({ force: false, alter: false });
      const tables = await sequelize.getQueryInterface().showAllTables();
      console.log('✅ Tables synchronisées:', tables.join(', '));
      return tables;
    } catch (error) {
      console.error('❌ Erreur de synchronisation:', error);
      throw error;
    }
    
  } else {
    // En dev/test : utiliser soit les options passées, soit celles de la config
    const force = options.force !== undefined ? options.force : config.sync.force;
    const alter = options.alter !== undefined ? options.alter : config.sync.alter;
    
    console.log(`ℹ️  Mode ${env.toUpperCase()}`);
    
    // Avertissement si force: true
    if (force) {
      console.warn('⚠️  ATTENTION: force: true activé !');
    }
    
    try {
      await sequelize.sync(force ? { force: true } : { alter });
      const tables = await sequelize.getQueryInterface().showAllTables();
      console.log('✅ Tables synchronisées:', tables.join(', '));
      return tables;
    } catch (error) {
      console.error('❌ Erreur de synchronisation:', error);
      throw error;
    }
  }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  console.log('🚀 Exécution directe du script de synchronisation...');
  
  initDatabase()
    .then((tables) => {
      console.log('');
      console.log(`✅ Synchronisation terminée avec succès (${tables.length} tables)`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('');
      console.error('❌ Échec de la synchronisation:', error);
      process.exit(1);
    });
}

export default initDatabase;