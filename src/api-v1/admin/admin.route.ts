import { Router } from "express";
import verifyToken from "../../helpers/verifyToken";
import user from "./user-management/usermanagement.route";
import workshop from "./workshops/workshop.route";

const admin: Router = Router();


admin.use("/workshop", workshop);
admin.use("/user", user)


export default admin;
