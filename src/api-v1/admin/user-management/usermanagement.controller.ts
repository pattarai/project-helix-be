import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import user from "./usermanagement.route";


const prisma = new PrismaClient();

export default class UserManagementController {
  public getUser = async (req: Request, res: Response) => {
      try{
        const email = req.params.email;
        const user = await prisma.user.findFirst({
            where:{
                email,
            },
            
        });
        delete user['password'];
        if(user){
            res.status(200).send({
                getUserResponse: true,
                user,
            })
        } 
        else{
            res.status(400).send({
                getUserResponse: false,
                errorMessage: "Invalid User email",
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
        const email = req.params.email;
        const checkUser = await prisma.user.findFirst({
            where:{
                email,
            }
        });
        if(checkUser){
            const user = await prisma.user.delete({
                where:{
                    email,
                }
            });
            delete user['password'];
            res.status(200).send({
                deleteUserResponse: true,
                user,
            });
        }
        else{
            res.status(400).send({
                deleteUserResponse: false,
                errorMessage: "Invalid User email",
                
            })
        }
        
      }catch(e){
        console.error(e);
        res.status(500).send({
        deleteUserResponse: false,
        message: e.toString(),
      });
      }
  }
  
}