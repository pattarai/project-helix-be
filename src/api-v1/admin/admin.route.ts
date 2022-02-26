import { Router } from "express";
import Controller from "./admin.controller";
import workshop from "./workshops/workshop.route";

const admin: Router = Router();
const controller = new Controller();


admin.route("/add").post(controller.addCourse)
admin.use("/workshop", workshop);


export default admin;
