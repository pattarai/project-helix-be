import { Response, Request } from "express"


export const validateSignUpBody = (req:Request, res:Response) =>{
    try{
        if(req.body.name == ""){
            res.status(400).send({
                errorMessage: "Name must be provided",
            })
        }
        else if(req.body.email == ""){
            res.status(400).send({
                errorMessage: "Email must be provided",
            })
        }
        else if(req.body.password == ""){
            res.status(400).send({
                errorMessage: "Password must be provided",
            })
        }
        else if(req.body.admin === undefined){
            res.status(400).send({
                errorMessage: "Admin role must be provided",
            })
        }
        else{
            return true;
        }
    }catch(e){
    console.error(e);
    res.status(500).send({
      createUserResponse: false,
      message: e.toString(),
    });
    }
}