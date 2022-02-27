let jwt = require("jsonwebtoken");

let checkAccess = (req: any, res: any, next: any) => {
  if (res.locals.admin) {
    next();
  } else {
    res.status(403).send({
      message: "Requires admin access",
    });
  }
};

export default checkAccess;
