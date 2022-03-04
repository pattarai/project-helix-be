import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateCreateWorshop, validateUpdateWorkshop } from "../../../middleware/validator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const prisma = new PrismaClient();

export default class WorkshopController {
  public createWorkshop = async (req: Request, res: Response) => {
    try{
      const{name, description} = req.body;
      const checkWorkshop = await prisma.workshop.findFirst({
        where:{
          name,
        }
      });

      if(checkWorkshop){
        res.status(400).send({
          errorMessage: "Workshop name already exists",
        })
      }
      else{
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
      }
    }catch(e){
      console.error(e);
        res.status(500).send({
        createWorkshopResponse: false,
        message: e.toString(),
      });
    }
  };

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

  public updateWorkshop = async (req:Request, res:Response) => {
    try{
      const {name, description, id} = req.body;
      const checkWorkshop = await prisma.workshop.findFirst({
        where:{
          id,
        }
      });
      if(checkWorkshop){
        if(validateUpdateWorkshop){
          const workshop = await prisma.workshop.update({
            where:{
              id,
            },
            data:{
              name,
              description,
            },
          });

          res.status(200).send({
            updateWorkshopResponse: true,
            workshop,
          })
        }
      }else{
        res.status(400).send({
          errorMessage: "Workshop does not exists"
        })
      }
    }catch(e){
      console.error(e);
        res.status(500).send({
        updateWorkshopResponse: false,
        message: e.toString(),
      });
    }
  }

  public deleteWorkshop =async (req:Request, res:Response) => {
    try{
      const {id} = req.body;
      const checkWorkshop = await prisma.workshop.findFirst({
        where:{
          id,
        },
      });
      if(checkWorkshop){
        const workshop = await prisma.workshop.delete({
          where:{
            id,
          }
        });
        res.status(200).send({
          deleteWorkshopResponse: true,
          workshop,
        })
      }else{
        res.status(404).send({
          errorMessage: "Workshop doesn't exist",
        })
      }
    }catch(e){
      console.error(e);
        res.status(500).send({
        deleteWorkshopResponse: false,
        message: e.toString(),
      });
    }
  }
}