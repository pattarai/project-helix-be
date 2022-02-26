import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

users.route("/course")
    .get(controller.getCourses)


export default users;
