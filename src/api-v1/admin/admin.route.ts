import { Router } from "express";
import workshop from "./workshops/workshop.route";

const admin: Router = Router();


admin.use("/workshop", workshop);


export default admin;
