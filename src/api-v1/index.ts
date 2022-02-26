import { Router } from "express";

import auth from "./auth/auth.route";
import admin from "./admin/admin.route";
import users from "./users/users.route";
import checkToken from "../helpers/jwtVerify";

const router: Router = Router();

router.use("/auth", auth);
router.use("/admin", checkToken, admin);
router.use("/users", users);

export default router;
