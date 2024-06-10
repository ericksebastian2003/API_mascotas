import { Router } from "express";
import { registerUsersController,loginUsersController } from "../controllers/users_controller.js";

const router = Router()

router.post('/register',registerUsersController)
router.post('/login',loginUsersController)

export default router