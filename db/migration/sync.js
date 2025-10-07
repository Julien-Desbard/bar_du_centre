// back/src/migration/sync.js
import 'dotenv/config';
import { sequelize } from '../models/index.js';
import '../models/index.js'; // importe modèles + associations

export async function initDatabase({ force = true, alter = false } = {}) {
  await sequelize.authenticate();
  console.log('Connected to', sequelize.config.host, '/', sequelize.config.database);
  await sequelize.sync(force ? { force: true } : { alter });
  const tables = await sequelize.getQueryInterface().showAllTables();
  console.log('Synced tables:', tables);
}

initDatabase()