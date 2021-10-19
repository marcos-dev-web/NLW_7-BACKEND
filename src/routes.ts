import { Router } from "express";

import authenticated from "./middlewares/authenticated";

import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateMessageController from "./controllers/CreateMessageController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();

router.post('/authenticate', authenticateUserController.handle);

router.post('/messages', authenticated, createMessageController.handle);

export default router;
