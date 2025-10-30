
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./src/routers/router.js";
import errorHandler from './src/middlewares/errorHandler.js'

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
const PORT = process.env.PORT || 3001;

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

// async function startServer() {
// 	try {
// 			await seed();
// 		app.listen(PORT, () => {
// 			console.log(`Server running on port ${PORT}`);
// 		});
// 	} catch (err) {
// 		console.error("Erreur au démarrage :", err);
// 		process.exit(1);
// 	}
// }
// startServer();
