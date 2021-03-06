import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateUpdateUserBody } from "../../../middleware/validator";
let jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

export default class ProfileController {
  public getUser = async (req: Request, res: Response) => {
      try{
        const email = req.params.email;
        const user = await prisma.user.findFirst({
            where:{
                email,
            }
        });
        if(user){
            delete user['password'];
            res.status(200).send({
                getUserResponse: true,
                user,
            })
        } 
        else{
            res.status(400).send({
                getUserResponse: false,
                errorMessage: "Invalid User ID",
            })
        }
      }catch(e){
        console.error(e);
        res.status(500).send({
        getUserResponse: false,
        message: e.toString(),
      });
      }
  };

  public deleteUser =async (req:Request, res: Response) => {
      try{
        const {user_id} = req.body;
            let token = req.headers["x-access-token"] || req.headers["authorization"];
            token = token.slice(7, token.length);

        jwt.verify(token, process.env.SECRET, async (err: any, decoded: any) =>{
            if(decoded.userId == user_id){
                const checkUser = await prisma.user.findFirst({
                    where:{
                        user_id,
                    }
                });
                if(checkUser){
                    const user = await prisma.user.delete({
                        where:{
                            user_id,
                        }
                    });
                    res.status(200).send({
                        deleteUserResponse: true,
                        user,
                    });
                }
                else{
                    res.status(400).send({
                        deleteUserResponse: false,
                        errorMessage: "Invalid User ID",
                        
                    })
                }
            }
            else{
                res.status(403).send({
                    errorMessage: "Invalid access",
                })
            }
        });

        
      }catch(e){
        console.error(e);
        res.status(500).send({
        deleteUserResponse: false,
        message: e.toString(),
      });
      }
  }

  public updateUserDets =async (req:Request, res:Response) => {
      try{
        const {user_id} = req.body;
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.SECRET, async (err: any, decoded: any) =>{

            if(decoded.userId == user_id){
                const checkUser = await prisma.user.findFirst({
                    where:{
                        user_id,
                    }
                });
                if(checkUser){
                    const {name, avatar, institute, department, year} = req.body;
                    console.log(name);
                    if(validateUpdateUserBody(req, res)){
                        const user = await prisma.user.update({
                            where:{
                                user_id,
                            },
                            data:{
                                name,
                                avatar,
                                institute,
                                department,
                                year,
                            }
                        })
                        delete user['password'];
                        res.status(200).send({
                            updateUserResponse: true,
                            user,
                        })
                    }
                }else{
                    res.status(400).send({
                        updateUserResponse: false,
                        errorMessage: "Invalid user ID",
                    })
                }
            }
            else{
                res.status(403).send({
                    errorMessage: "Invalid access",
                })          
            }
        });

      }catch(e){
        console.error(e);
        res.status(500).send({
        updateUserResponse: false,
        message: e.toString(),
      });
      }
  }
  
}