import { Router } from "express";
import Controller from "./admin.controller";

const admin: Router = Router();
const controller = new Controller();


admin.route("/add").post(controller.addCourse)


export default admin;
