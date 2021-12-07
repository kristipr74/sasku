import { Request, Response, NextFunction } from "express";
import jwtService from "../services/jwtService";
import responseCodes from "../responseCodes";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(responseCodes.notAuthorized).json({
      error: "No token provided",
    });
  }
  const payload = await jwtService.verify(token);
  if (!payload) {
    return res.status(responseCodes.notAuthorized).json({
      error: "Invalid token",
    });
  }
  res.locals.users = payload;
  return next();
};

export default isLoggedIn;
