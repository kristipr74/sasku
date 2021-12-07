import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { users } = res.locals;
  if (users.role !== "Admin") {
    return res.status(responseCodes.notAuthorized).json({
      error: "You have to be admin for this operatation",
    });
  }
  return next();
};

export default isAdmin;
