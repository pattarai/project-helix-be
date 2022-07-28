import { ESRCH } from "constants";
import { Response, Request } from "express";

export const validateSignUpBody = (req: Request, res: Response) => {
  try {
    if (req.body.name == "") {
      res.status(400).send({
        errorMessage: "Name must be provided",
      });
    } else if (req.body.email == "") {
      res.status(400).send({
        errorMessage: "Email must be provided",
      });
    } else if (req.body.password == "") {
      res.status(400).send({
        errorMessage: "Password must be provided",
      });
    }
    // else if(req.body.admin === undefined){
    //     res.status(400).send({
    //         errorMessage: "Admin role must be provided",
    //     })
    // }
    // else if(req.body.institute == ""){
    //     res.status(400).send({
    //         errorMessage: "Institute name must be provided",
    //     })
    // }
    // else if(req.body.department === ""){
    //     res.status(400).send({
    //         errorMessage: "Department/ Mainstream of study must be provided",
    //     })
    // }
    // else if(req.body.year === undefined){
    //     res.status(400).send({
    //         errorMessage: "Year of study must be provided",
    //     })
    // }
    // else if(req.body.year > 4 || req.body.year < 1){
    //     res.status(400).send({
    //         errorMessage: "Invalid year of study",
    //     })
    // }
    else {
      return true;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({
      createUserResponse: false,
      message: e.toString(),
    });
  }
};

export const validateUpdateUserBody = (req: Request, res: Response) => {
  try {
    if (req.body.name == "") {
      res.status(400).send({
        errorMessage: "Name must not be empty",
      });
    } else if (req.body.institute == "") {
      res.status(400).send({
        errorMessage: "Institute name must not be empty",
      });
    } else if (req.body.department == "") {
      res.status(400).send({
        errorMessage: "Department must not be empty",
      });
    } else if (req.body.year > 4 || req.body.year < 1) {
      res.status(400).send({
        errorMessage: "Invalid year of study",
      });
    } else {
      return true;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({
      updateUserResponse: false,
      message: e.toString(),
    });
  }
};

export const validateCreateWorshop = (req: Request, res: Response) => {
  if (req.body.name == "") {
    res.status(400).send({
      errorMessage: "Workshop Name must not be empty",
    });
  } else if (req.body.description == "") {
    res.status(400).send({
      errorMessage: "Workshop Description must not be empty",
    });
  } else {
    return true;
  }
};

export const validateUpdateWorkshop = (req: Request, res: Response) => {
  if (req.body.name == "") {
    res.status(400).send({
      errorMessage: "Workshop name must not be empty",
    });
  } else if (req.body.description == "") {
    res.status(400).send({
      errorMessage: "Workshop description must be provided",
    });
  } else {
    return true;
  }
};
