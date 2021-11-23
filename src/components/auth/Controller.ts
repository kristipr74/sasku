import express, { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import loginService from "./service";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = loginService.login(email, password);
    if (!token) {
      return res.status(responseCodes.notAuthorized).json({
        error: "Kontrolli sisestatud andmeid",
      });
    }
    return res.status(responseCodes.ok).json({
      token,
    });
  },
};

export default authController;
