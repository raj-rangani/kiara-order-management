import { Router } from "express";
import { UserController } from "../../controllers/user/user.controller";

const route: Router = Router();

route.post("/signup", UserController.signupUser);
route.post("/login", UserController.loginUser);

export default route;
