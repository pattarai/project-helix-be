import { Router } from "express";

import auth from "./auth/auth.route";
import admin from "./admin/admin.route";
import users from "./users/users.route";
import verifyAdminToken from "../helpers/verifyAdminToken";
import verifyUserToken from "../helpers/verifyUserToken";
import checkAccess from "../middleware/checkAccess";

const router: Router = Router();

router.use("/auth", auth);
// router.use("/admin",verifyAdminToken, admin);
// router.use("/users", verifyUserToken, users);

export default router;
