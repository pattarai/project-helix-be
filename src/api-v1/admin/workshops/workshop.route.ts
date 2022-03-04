import { Router } from "express";
import Controller from "./workshop.controller";

const workshop: Router = Router();
const controller = new Controller();

workshop.route("/")
    .post(controller.createWorkshop)
    .get(controller.getWorkshop)


export default workshop;