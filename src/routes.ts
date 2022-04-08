import {Router} from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./midldlewares/ensureAdmin";
import { ensureAuthenticated } from "./midldlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUSerController";
import { CreateComplimentoController } from "./controllers/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentoController()
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();

router.post("/users", createUserController.handle);

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);

router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/login", autheticateUserController.handle);

router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);

router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);


export { router };