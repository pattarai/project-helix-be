import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default class UserManagementController {
  public getUser = async (req: Request, res: Response) => {
      try{
        const {user_id} = req.body;
        const user = await prisma.user.findFirst({
            where:{
                user_id,
            },
        });
        if(user){
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
        
      }catch(e){
        console.error(e);
        res.status(500).send({
        deleteUserResponse: false,
        message: e.toString(),
      });
      }
  }
  
}