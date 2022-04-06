import {Router} from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./midldlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUSerController";
import { CreateComplimentoController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentoController()

router.post("/users", createUserController.handle);

router.post("/tags", ensureAdmin, createTagController.handle);

router.post("/login", autheticateUserController.handle);

router.post("/compliments", createComplimentController.handle);

export { router };