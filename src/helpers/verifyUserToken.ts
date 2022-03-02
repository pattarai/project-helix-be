let jwt = require("jsonwebtoken");

let verifyUserToken = (req: any, res: any, next: any) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.json({
          message: "Token is not valid",
        });
      } else {
          if(decoded.userId == req.body.user_id){
            res.locals.admin = decoded.admin;
            next();
          }
          else{
              res.status(403).send({
                  message: "Invalid Access",
              })
          }
      }
    });
  } else {
    return res.json({
      message: "Auth token is not supplied",
    });
  }
};

export default verifyUserToken;