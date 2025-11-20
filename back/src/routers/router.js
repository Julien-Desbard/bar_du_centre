import express from "express";
import menuRoute from "./routes/menu.Routes.js"
import carteRoute from "./routes/carte.Routes.js"
import { criticalLimiter } from "../middlewares/security.js";

const router = express.Router()

router.use('/menu', menuRoute)
router.use('/carte', carteRoute)

export default router