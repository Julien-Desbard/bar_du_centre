import express from "express";
import menuController from "../../controllers/menuControllers.js"

const router = express.Router()

router.get('/', menuController.getAllMenuItems)
router.get('/cat/:cat1', menuController.getMenuItemsPerCat1)
router.get('/:id', menuController.getOneMenuItem)
router.patch('/:id', menuController.updateOneMenuItem)
router.delete('/:id', menuController.deleteOneMenuItem)
router.post('/',menuController.createOneMenuItem)

export default router