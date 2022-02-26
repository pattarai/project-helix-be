import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const prisma = new PrismaClient();

export default class WorkshopController {
  public createWorkshop = async (req: Request, res: Response) => {
    console.log("Inside create workshop");
    const { name, description } = req.body;
    const workshop = await prisma.workshop.create({
      data: {
        name,
        description,
      },
    });
    res.status(200).send({
      success: "true",
      createdWorkshop: workshop,
    });
  };

  public getWorkshop = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const workshop = await prisma.workshop.findFirst({
      where: {
        name,
        description,
      },
    });
  };

  public updateWorkshop = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const workshop = await prisma.workshop.update({
      where: {
        name,
      },
      data: {
        name,
        description,
      }, // data to update
    });
    res.status(200).send({
      success: "true",
      updatedWorkshop: workshop,
    });
  };

  public deleteWorkshop = async (req: Request, res: Response) => {
    const { name } = req.body;
    const workshop = await prisma.workshop.delete({
      where: {
        name,
      },
    });
    res.status(200).send({
      success: "true",
      deletedWorkshop: workshop,
    });
  };

  public getAllWorkshops = async (req: Request, res: Response): Promise<any> => {
    try {
      const workshops = await prisma.workshop.findMany();
      return res.status(200).json({
        message: "Success",
        workshops,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };
}