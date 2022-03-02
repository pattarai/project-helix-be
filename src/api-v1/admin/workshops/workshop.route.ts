import { Router } from "express";
import Controller from "./workshop.controller";

const workshop: Router = Router();
const controller = new Controller();

workshop.route("/")
    .post(controller.createWorkshop)


export default workshop;