import { Router } from "express";

import auth from "./auth/auth.route";
import admin from "./admin/admin.route";
import users from "./users/users.route";
import verifyToken from "../helpers/verifyToken";
import checkAccess from "../middleware/checkAccess";

const router: Router = Router();

router.use("/auth", auth);
router.use("/admin", verifyToken, checkAccess, admin);
router.use("/users", verifyToken, users);

export default router;
