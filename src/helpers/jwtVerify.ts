let jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
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
        if (decoded.admin) {
          res.locals.user = decoded.admin;
          next();
        } else {
          return res.json({
            message: "Requires admin access",
          });
        }
      }
    });
  } else {
    return res.json({
      message: "Auth token is not supplied",
    });
  }
};

export default checkToken;
