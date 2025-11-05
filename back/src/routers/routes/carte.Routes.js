import express from "express";
import carteController from "../../controllers/carteControllers.js"

const router = express.Router()

router.get("/", carteController.getAllCarteItems)
router.get("/:id", carteController.getOneCarteItem)
router.patch("/:id", carteController.updateCarteItem)
router.post("/", carteController.createCarteItem)
router.delete("/:id", carteController.deleteCarteItem)


export default router