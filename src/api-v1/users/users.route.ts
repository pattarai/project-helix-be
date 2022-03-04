import { profile } from "console";
import { Router } from "express";
import userprofile from "./profile/profile.route";
import verifyToken from "../../helpers/verifyAdminToken";
import workshop from "../users/workshop/workshop.route";

const users: Router = Router();

users.use("/profile",userprofile);
users.use("/workshop",workshop)

export default users;
