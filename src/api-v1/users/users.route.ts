import { profile } from "console";
import { Router } from "express";
import userprofile from "./profile/profile.route";

const users: Router = Router();

users.use("/profile",userprofile);

export default users;
