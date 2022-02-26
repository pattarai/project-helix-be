import { Router } from "express";

import users from "./users/users.route";
// import authorize from "../helpers/jwtVerify";

const router: Router = Router();

router.use("/users", users);

// only for authorized users
// router.use("/posts", authorize, posts);

export default router;
