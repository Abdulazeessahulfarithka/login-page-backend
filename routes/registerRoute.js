import express from "express"
import { signUp ,getAll} from "../controllers/register.js"
const router=express.Router()


router.post("/register",signUp)
router.get("/alluser",getAll)

export default router
