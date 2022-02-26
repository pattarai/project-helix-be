import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateSignUpBody } from "../../middleware/validator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export default class AuthController {
  public signUpUser = async (req: Request, res: Response) => {
    try{
      console.log("Inside create user");
      const { name, email, password, avatar, admin, follower } = req.body;
      if(validateSignUpBody(req,res)){
        const hashPassword = bcrypt.hashSync(password, 10);
        const checkUser = await prisma .user.findFirst({
          where:{
            email,
          }
        })
        if(checkUser){
          res.status(400).send({
            errorMessage: "User already exists"
          })
        }
        else{
          const user = await prisma.user.create({
            data: {
              name,
              email,
              password: hashPassword,
              avatar,
              admin,
              follower,
            },
          });
          res.status(200).send({
            success: "true",
            createdUser: user,
          });
        }
      }
    }catch(e){
      console.error(e);
    res.status(500).send({
      createUser: false,
      message: e.toString(),
    });
    }
  };

  public loginUser = async (req: Request, res: Response) => {
    try{
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      
      if(user != null){
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              email,
              userId: user.user_id,
              admin: user.admin,
            },
            process.env.SECRET,
            {
              expiresIn: "12h",
            }
          );
          res.status(200).send({
            success: "true",
            user,
            token,
          });
        } else {
          res.status(400).send({
            errorMessage: "Invalid Password",
          });
       }
     }
     else{
       res.status(400).send({
         errorMessage:"Invalid Email",
       })
     }
    }catch(e){
      console.error(e);
      res.status(500).send({
        createUser: false,
        message: e.toString(),
      });
    }
  };
}
