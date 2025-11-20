import express from "express";
import menuRoute from "./routes/menu.Routes.js"
import carteRoute from "./routes/carte.Routes.js"
import { criticalLimiter } from "../middlewares/security.js";

const router = express.Router()

router.use('/menu', criticalLimiter, menuRoute)
router.use('/carte',criticalLimiter,carteRoute)

export default router