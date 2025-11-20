import express from "express";
import menuController from "../../controllers/menuControllers.js"
import { criticalLimiter, generalLimiter, strictLimiter } from "../../middlewares/security.js";

const router = express.Router()

router.get('/',generalLimiter, menuController.getAllMenuItems)
router.get('/cat/:cat1',generalLimiter, menuController.getMenuItemsPerCat1)
router.get('/cat2/:slug_cat2',generalLimiter, menuController.getMenuItemsPerSlugCat2)

router.get('/:id',generalLimiter, menuController.getOneMenuItem)
router.patch('/:id',strictLimiter, menuController.updateOneMenuItem)
router.delete('/:id', criticalLimiter, menuController.deleteOneMenuItem)
router.post('/',criticalLimiter, menuController.createOneMenuItem)

export default router