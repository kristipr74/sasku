import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";
import jwtService from "../services/jwtService";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders?.split(" ")[1];
  if (token) {
    const payload = await jwtService.verify(token);
    if (!payload) {
      return res.status(responseCodes.notAuthorized).json({
        error: "Token is not valid",
      });
    }
    return next();
  }
  return res.status(responseCodes.notAuthorized).json({
    error: "no token provided",
  });
};

export default isLoggedIn;
