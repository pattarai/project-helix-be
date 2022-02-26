import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

users
  .route("/")
  .post(controller.signUpUser)
  .get(controller.loginUser)

export default users;
