import express from "express"
import { signUp ,getAll} from "../controllers/register.js"
const router=express.Router()

router.post("/register",signUp)
router.post("/alluser",getAll)

export default router
