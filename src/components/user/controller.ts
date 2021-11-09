import express, { Request, Response } from "express";
import {User, NewUser} from "./interface";
import userService from "./service";

//Get all users controller
const getAllUsers = (req: Request, res: Response) => {
  const user: User[] = userService.getAllUsers();
  return res.status(200).json({
    user,
  });
};

//Get user controller
const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = userService.getUserById(id);
  if (!user) {
    return res.status(400).json({
      message: `Sellist - ${id} - kasutajat ei ole!`,
    });
  }
  return res.status(200).json({
    user,
  });
};

//Create user controller
const createUser = (req: Request, res: Response) => {
  const { userName, password, firstName, lastName, description, created } =
    req.body;
    const newUser: NewUser = {
      userName,
      password,
      firstName,
      lastName,
      description,
      created,
    }
  const id: string = userService.createUser( newUser );

  return res.status(200).json({
    id,
  });
};

export { getAllUsers, getUserById, createUser };
