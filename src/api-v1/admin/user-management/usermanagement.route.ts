import { Router } from "express";
import Controller from "./usermanagement.controller";

const user: Router = Router();
const controller = new Controller();

user.route("/:email")
    .get(controller.getUser)
    .delete(controller.deleteUser)


export default user;