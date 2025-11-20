import express from "express";
import carteController from "../../controllers/carteControllers.js"
import { criticalLimiter, generalLimiter, strictLimiter } from "../../middlewares/security.js";

const router = express.Router()

router.get("/",generalLimiter, carteController.getAllCarteItems)
router.get("/:id",generalLimiter, carteController.getOneCarteItem)
router.patch("/:id",strictLimiter, carteController.updateCarteItem)
router.post("/",criticalLimiter,  carteController.createCarteItem)
router.delete("/:id",criticalLimiter,  carteController.deleteCarteItem)


export default router