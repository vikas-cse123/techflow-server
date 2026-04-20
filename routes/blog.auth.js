import express from "express"
import { createBlog } from "../controllers/blog.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const router = express.Router()


//left: add validateRequest middleware
router.post("/",requireAuth,createBlog)

export default router