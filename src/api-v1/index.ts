import { Router } from "express";

import auth from "./auth/auth.route";
import admin from "./admin/admin.route";
import users from "./users/users.route";
// import authorize from "../helpers/jwtVerify";

const router: Router = Router();

router.use("/auth", auth);
router.use("/admin", admin)
router.use("/users", users);

// only for authorized users
// router.use("/posts", authorize, posts);

export default router;
