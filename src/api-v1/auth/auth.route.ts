import { Router } from "express";
import Controller from "./auth.controller";

const auth: Router = Router();
const controller = new Controller();

auth.route("/signup").post(controller.signUpUser)
auth.route("/login").post(controller.loginUser)


export default auth;
