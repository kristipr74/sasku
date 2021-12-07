import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { users } = res.locals;
  if (users.role !== "Admin") {
    return res.status(responseCodes.notAuthorized).json({
      error: "Sul ei ole antud keskkonnas Admin õiguseid",
    });
  }
  return next();
};

export default isAdmin;
