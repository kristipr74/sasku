import { Request, Response } from "express";
import db from "../../db";
import responseCodes from "../../general/responseCodes";
import hashService from "../../general/services/hahshService";
import { User, NewUser } from "./interface";
import userService from "./service";

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
    role,
  } = req.body;
  const newUser: NewUser = {
    userName,
    password,
    firstName,
    lastName,
    description,
    created,
    email,
    role,
  };
  const id = await userService.createUser(newUser);
  return res.status(responseCodes.ok).json({
    id,
  });
};

const getUsers = (req: Request, res: Response) => {
  const user = userService.getUsers();
  return res.status(responseCodes.ok).json({
    user,
  });
};

//* /Get all users controller
/* const getAllUsers: (req: Request, res: Response) => {
  const user = userService.getAllUsers();
  return res.status(responseCodes.ok).json({
    user,
  });
}; */

//Create user controller
/* const createUser = (req: Request, res: Response) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    description,
    created,
    email,
    role,
  } = req.body;
  const id = userService.createUser(newUser);
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
  const id = userService.createUser(newUser);

  return res.status(responseCodes.ok).json({
    id,
  });
}; */

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

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = userService.getUserByEmail(email);
  if (!user) {
    return res.status(responseCodes.notFound).json({
      error: "Sellist kasutajat ei eksisteeri!",
    });
  }
  const match = await hashService.compare(password, user.password);
  if(!match){
    return res.status(responseCodes.notFound).json({
      error: 'Sisestatud parool on vale, proovi uuesti!'
          });
  };
  return res.status(responseCodes.ok).json({
    token: 'token',
  });
};

export { getUsers, getUserById, createUser, login };
