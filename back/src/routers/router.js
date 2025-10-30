import express from "express";
import menuRoute from "./routes/menu.Routes.js"
import errorHandler from '../errors/AppError.js'

const router = express.Router()

router.use('/menu',menuRoute)

export default router