// back/src/models/sequelize.js
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize } from "sequelize";
import config from "../config/config.js";

// Load .env wherever it is located
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Load database info from .env + error if absent
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error("❌ DATABASE_URL manquant dans .env");
}

// Parse l'URL de la base de données
const u = new URL(DATABASE_URL);

// 🆕 Récupère les options de config selon l'environnement
const dbOptions = config.database.options;

// Connecting to Sequelize avec les options de l'environnement
export const sequelize = new Sequelize(
  u.pathname.slice(1),                   // database name
  decodeURIComponent(u.username),        // user
  decodeURIComponent(u.password),        // password
  {
    host: u.hostname,
    port: u.port ? Number(u.port) : 5432,
    dialect: "postgres",
    
    // 🆕 Options dynamiques selon l'environnement (dev/prod)
    logging: dbOptions.logging,           // true en dev, false en prod
    pool: dbOptions.pool,                 // Configuration du pool
    dialectOptions: dbOptions.dialectOptions, // SSL en prod
    
    define: { 
      underscored: true,
      timestamps: true,  // createdAt, updatedAt automatiques
    },
  }
);

// Testing connection to Sequelize
const testSequelize = async () => {
  try {
    await sequelize.authenticate();
    const env = process.env.NODE_ENV || 'development';
    console.log(`✅ Connexion à la base de données réussie (${env})`);
    
    // En développement, afficher des infos utiles
    if (env === 'development') {
      console.log(`📊 Database: ${u.pathname.slice(1)}`);
      console.log(`🖥️  Host: ${u.hostname}:${u.port || 5432}`);
      console.log(`📝 Logging SQL: ${dbOptions.logging ? 'ON' : 'OFF'}`);
    }
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
    process.exit(1); // Arrête l'app si la connexion échoue
  }
};

testSequelize();
