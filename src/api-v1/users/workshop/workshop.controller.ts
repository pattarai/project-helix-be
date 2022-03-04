import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const prisma = new PrismaClient();

export default class WorkshopController {
  
  public getWorkshop =async (req:Request, res:Response) => {
    try{
      const {id} = req.body;
      if(id === undefined){
        res.status(400).send({
          errorMessage: "Workshop id must not be empty",
        });
      }
      else{
        const workshop = await prisma.workshop.findFirst({
          where:{
            id,
          },
        });
        if(workshop){
          res.status(200).send({
            getWorkshopResponse: true,
            workshop,
          })
        }
        else{
          res.status(400).send({
            errorMessage: "Workshop does not exist",
          });
        }
      }
    }catch(e){
      console.error(e);
        res.status(500).send({
        getWorkshopResponse: false,
        message: e.toString(),
      });
    }
  }

}