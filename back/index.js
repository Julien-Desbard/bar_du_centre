import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./src/routers/router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import { initDatabase } from "./src/migration/sync.js";
import seed from "./src/migration/seed.js";

const app = express();

// 2) CORS (autorise Vercel + local)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'bar-du-centre.vercel.app',
];

app.use(cors())
// app.use(cors({
//   origin: (origin, cb) => {
//     // autorise requêtes sans Origin (clients type curl/postman) ou whitelisted
//     if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
//     cb(new Error('CORS: origin non autorisée'));
//   },
//   credentials: true,
//   methods: ['GET','POST','PATCH','DELETE','PUT'],
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
const PORT = process.env.PORT || 3001;

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

async function startServer() {
	try {
		// ⚠️ Ne sync/seed qu’en dev ou si activé explicitement
		// if (
		// 	process.env.NODE_ENV !== "production" ||
		// 	process.env.ALLOW_SYNC === "true"
		// ) {
			await initDatabase(); // en prod: passe en alter:true et déclenche seulement manuellement
		// }
		// if (
		// 	process.env.NODE_ENV !== "production" ||
		// 	process.env.ALLOW_SEED === "true"
		// ) {
			await seed();
		// }

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (err) {
		console.error("Erreur au démarrage :", err);
		process.exit(1);
	}
}
startServer();
