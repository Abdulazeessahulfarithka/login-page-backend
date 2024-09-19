import express from "express"
import { signUp } from "../controllers/register.js"
const router=express.Router()

router.post("/register",signUp)

export default router
