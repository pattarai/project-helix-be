import { decode } from "punycode";
import {Request, Response, NextFunction} from "express";

let jwt = require("jsonwebtoken");

let verifyAdminToken = (req: any, res: any, next: NextFunction) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      console.log("Decode: "+decoded.admin);
      if (err) {
        return res.status(400).json({
          message: "Token is not valid",
        });
      } else {
        if(decoded.admin){
          res.locals.admin = decoded.admin;
          next();
        }
        else{
          res.status(403).send({
            message: "Access Denied. Invalid Role"
          })
        }
      }
    });
  } else {
    return res.status(400).json({
      message: "Auth token is not supplied",
    });
  }
};

export default verifyAdminToken;
