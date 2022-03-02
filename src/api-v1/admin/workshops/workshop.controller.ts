import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateCreateWorshop } from "../../../middleware/validator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const prisma = new PrismaClient();

export default class WorkshopController {
  public createWorkshop = async (req: Request, res: Response) => {
    try{
      const{name, description} = req.body;
      if(validateCreateWorshop){
        const workshop = await prisma.workshop.create({
          data:{
            name,
            description,
          },
        });
        res.status(200).send({
          createWorkshopResponse: true,
          workshop,
        });
      }
    }catch(e){
      console.error(e);
        res.status(500).send({
        deleteUserResponse: false,
        message: e.toString(),
      });
    }
  };
}