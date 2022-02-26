import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export default class UserController {
  public createUser = async (req: Request, res: Response) => {
    console.log("Inside create user");
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    res.status(200).send({
      success: "true",
      createdUser: user,
    });
  };

  public getUser = async (req: Request, res: Response) => {
    const { user_id, email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if(bcrypt.compareSync(password, user.password)){
      const token = jwt.sign({
        email,
        userId: user_id,
      },
      process.env.SECRET,
      {
        expiresIn: "12h"
      }
      );
      res.status(200).send({
        success: "true",
        user,
        token,
      });
    }
    else{
      res.status(400).send({
        errorMessage : "Invalid Password",
      })
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    const { user_id, name, email } = req.body;
    const user = await prisma.user.update({
      where: {
        user_id,
      },
      data: {
        name,
        email,
      }, // data to update
    });
    res.status(200).send({
      success: "true",
      updatedUser: user,
    });
  };

  public deleteUser = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    const user = await prisma.user.delete({
      where: {
        user_id,
      },
    });
    res.status(200).send({
      success: "true",
      deletedUser: user,
    });
  };

  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json({
        message: "Success",
        users,
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
