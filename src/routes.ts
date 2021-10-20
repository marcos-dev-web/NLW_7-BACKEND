import { Router } from "express";

import authenticated from "./middlewares/authenticated";

import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateMessageController from "./controllers/CreateMessageController";
import GetLast3MessagesController from "./controllers/GetLast3MessagesController";
import ProfileUserController from "./controllers/ProfileUserController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLast3MessagesController = new GetLast3MessagesController();
const profileUserController = new ProfileUserController();

router.post("/authenticate", authenticateUserController.handle);

router.post("/messages", authenticated, createMessageController.handle);

router.get("/messages", getLast3MessagesController.handle);

router.get("/profile", authenticated, profileUserController.handle);

export default router;
