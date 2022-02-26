import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateSignUpBody } from "../../helpers/validator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export default class AdminController {

    public addCourse = async (req: Request, res: Response) => {
        try {

            // < Code />

        } catch (e) {
            console.error(e);
            res.status(500).send({
                status: false,
                message: e.toString(),
            });
        }
    };
}
