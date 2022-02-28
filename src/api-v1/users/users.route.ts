import { profile } from "console";
import { Router } from "express";
import userprofile from "./profile/profile.route";
import verifyToken from "../../helpers/verifyToken";

const users: Router = Router();

users.use("/profile",verifyToken,userprofile);

export default users;
