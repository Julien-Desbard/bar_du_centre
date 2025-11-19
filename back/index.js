import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./src/routers/router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import { initDatabase } from "./src/migration/sync.js";
import seed from "./src/migration/seed.js";
import config from "./src/config/config.js";

// 🆕 Import des middlewares de sécurité
import {
	generalLimiter,
	helmetConfig,
	helmetDevConfig,
	blockSuspiciousUserAgents,
	securityLogger,
} from "./src/middlewares/security.js";

const app = express();

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARES DE SÉCURITÉ
// ═══════════════════════════════════════════════════════════════

// 1️⃣ Helmet - Sécurise les headers HTTP
const env = process.env.NODE_ENV || "development";
if (env === "production") {
	app.use(helmetConfig);
	console.log("🛡️  Helmet activé (production)");
} else {
	app.use(helmetDevConfig);
	console.log("🛡️  Helmet activé (développement)");
}

// 2️⃣ CORS
const corsOptions = {
	origin: config.server.cors.origin,
	credentials: true,
	methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
};
app.use(cors(corsOptions));

// 3️⃣ Rate limiting général (100 req/15min sur /api/*)
app.use("/api", generalLimiter);

// 4️⃣ Bloque les User-Agents suspects
app.use(blockSuspiciousUserAgents);

// 5️⃣ Logger de sécurité (dev uniquement)
if (env === "development") {
	app.use(securityLogger);
}

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARES STANDARDS
// ═══════════════════════════════════════════════════════════════

app.use(express.json({ limit: "10mb" })); // Limite la taille des payloads JSON
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ═══════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════

app.use("/api", router);

// Route de santé (PAS de rate limiting sur celle-ci)
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "OK",
		environment: env,
		timestamp: new Date().toISOString(),
	});
});

// Error handler (doit être en dernier)
app.use(errorHandler);

// ═══════════════════════════════════════════════════════════════
// DÉMARRAGE DU SERVEUR
// ═══════════════════════════════════════════════════════════════

async function startServer() {
	try {
		console.log(`🚀 Démarrage de l'application en mode ${env.toUpperCase()}`);

		// 1️⃣ Synchronisation de la base de données
		await initDatabase();

		// 2️⃣ Seed uniquement si activé (dev/test)
		if (config.seed) {
			await seed();
		} else {
			console.log("ℹ️  Seed désactivé pour cet environnement");
		}

		// 3️⃣ Démarrage du serveur
		const PORT = config.server.port;
		app.listen(PORT, () => {
			console.log("");
			console.log("✅ Serveur démarré avec succès !");
			console.log(`📡 Port: ${PORT}`);
			console.log(`🌍 Environnement: ${env}`);
			console.log(
				`🔒 CORS autorisé pour: ${JSON.stringify(config.server.cors.origin)}`
			);
			console.log(`🛡️  Rate limiting: 100 req/15min (général)`);
			console.log("");
		});
	} catch (err) {
		console.error("");
		console.error("❌ Erreur au démarrage du serveur:", err);
		console.error("");
		process.exit(1);
	}
}

// Gestion des erreurs non capturées
process.on("unhandledRejection", (error) => {
	console.error("❌ Unhandled Rejection:", error);
	process.exit(1);
});

process.on("uncaughtException", (error) => {
	console.error("❌ Uncaught Exception:", error);
	process.exit(1);
});

startServer();

export default app;
