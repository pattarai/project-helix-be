import { Router } from "express";
import Controller from "./profile.controller";

const profile: Router = Router();
const controller = new Controller();

profile.route("/:email")
    .get(controller.getUser)
profile.route("/")
    .delete(controller.deleteUser)
    .put(controller.updateUserDets)

export default profile;