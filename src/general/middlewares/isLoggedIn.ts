import { Request, Response, NextFunction } from "express";
import jwtService from "../services/jwtService";
import responseCodes from "../responseCodes";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (token) {
    const payload = await jwtService.verify(token);
    if (!payload) {
      return res.status(responseCodes.notAuthorized).json({
        error: "Token is not valid",
      });
    }

    res.locals.players = payload;
    return next();
  }
  return res.status(responseCodes.notAuthorized).json({
    error: "No token provide",
  });
};

export default isLoggedIn;
