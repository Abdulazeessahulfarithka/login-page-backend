import express from "express"
import { signUp ,getAll} from "../controllers/register.js"
import cors from "cors"
const router=express.Router()


router.use(cors());

router.post("/register",signUp)
router.get("/alluser",getAll)

export default router
