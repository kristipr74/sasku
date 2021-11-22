import express, { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import { User, NewUser } from "./interface";
import userService from "./service";

//Get all users controller
const getAllUsers = (req: Request, res: Response) => {
  const user: User[] = userService.getAllUsers();
  return res.status(responseCodes.ok).json({
    user,
  });
};

//Get user controller
const getUserById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  const user = userService.getUserById(id);
  if (!user) {
    return res.status(responseCodes.badRequest).json({
      message: `Sellist - ${id} - kasutajat ei ole!`,
    });
  }
  return res.status(responseCodes.ok).json({
    user,
  });
};

//Create user controller
const createUser = async (req: Request, res: Response) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    description,
    created,
    email,
  } = req.body;
  if (!firstName) {
    return res.status(responseCodes.badRequest).json({
      error: "Eesnimi on kohustuslik!",
    });
  }
  if (!lastName) {
    return res.status(responseCodes.badRequest).json({
      error: "Perekonnanimi on kohustuslik!",
    });
  }
  if (!email) {
    return res.status(responseCodes.badRequest).json({
      error: "E-mail on kohustuslik!",
    });
  }
  if (!password) {
    return res.status(responseCodes.badRequest).json({
      error: "Parool on kohustuslik!",
    });
  }
  const newUser: NewUser = {
    userName,
    password,
    firstName,
    lastName,
    description,
    created,
    email,
    role: "User",
  };
  const id = await userService.createUser(newUser);

  return res.status(responseCodes.ok).json({
    id,
  });
};

export { getAllUsers, getUserById, createUser };
