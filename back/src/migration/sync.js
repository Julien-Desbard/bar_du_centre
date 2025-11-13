
import 'dotenv/config';
import { sequelize } from '../models/index.js';
import '../models/index.js'; 

export async function initDatabase({ force = true, alter = false } = {}) {
  try {
    await sequelize.authenticate();
    console.log('Connected to', sequelize.config.host, '/', sequelize.config.database);
  } catch (error) {
    console.error('❌ Erreur lor de la connexion', error);
  }
try {
    await sequelize.sync(force ? { force: true } : { alter });
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('Synced tables:', tables);
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error);
  }
}

// initDatabase()