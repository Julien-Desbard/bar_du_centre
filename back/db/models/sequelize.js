import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize } from "sequelize";

// Load .env wherever it is located
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// load database info from .env + error if absent
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error("DATABASE_URL manquant dans .env");

const u = new URL(DATABASE_URL)

// Connecting to sequelize
export const sequelize = new Sequelize(
  u.pathname.slice(1),                   // database
  decodeURIComponent(u.username),        // user
  decodeURIComponent(u.password),        // password
  {
    host: u.hostname,
    port: u.port ? Number(u.port) : 5432,
    dialect: "postgres",
    logging: false,
    define: { underscored: true },
  }
);

// Testing connection to sequelize
const testSequelize = async () => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}}
testSequelize()