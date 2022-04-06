import {Router} from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./midldlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUSerController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle);

router.post("/tags", ensureAdmin, createTagController.handle);

router.post("/login", autheticateUserController.handle);

export { router };