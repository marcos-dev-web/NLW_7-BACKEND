import { Router } from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";

const router = Router();

const AuthenticateUser = new AuthenticateUserController();

router.post('/authenticate', AuthenticateUser.handle);

export default router;
