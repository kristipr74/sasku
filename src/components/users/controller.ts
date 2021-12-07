import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import usersService from "./service";
import { UpdateUser, NewUser } from "./interface";

const usersController = {
  getAllUsers: (req: Request, res: Response) => {
    const users = usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },

  getUserById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (id === res.locals.users.id || res.locals.users.role === "Admin") {
      const users = usersService.getUserById(id);
      if (!users) {
        return res.status(responseCodes.badRequest).json({
          message: `Sellise - ${id} -ga  kasutajat ei ole!`,
        });
      }

      return res.status(responseCodes.ok).json({
        users,
      });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: "Sul ei ole sellise tegevuse jaoks õigusi",
    });
  },

  //Create user controller
  createUser: async (req: Request, res: Response) => {
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
    if (!userName) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun kasutajanimi",
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun parool",
      });
    }
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun Eesnimi",
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun Perekonnanimi",
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun e-maili aadress",
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
    const id = await usersService.createUser(newUser);
    return res.status(responseCodes.ok).json({
      id,
    });
  },

  removeUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga kasutajat ei ole",
      });
    }
    const users = usersService.getUserById(id);
    if (!users) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id- ${id} -ga kasutajat ei ole`,
      });
    }
    usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({});
  },

  updateUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName, email } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "SEllise id kasutajat ei ole",
      });
    }
    if (!firstName && !lastName && !email) {
      return res.status(responseCodes.badRequest).json({
        error: "Andmetes ei ole midagi muuta",
      });
    }
    const users = usersService.getUserById(id);
    if (!users) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise ${id}-ga kasutajat ei leitud`,
      });
    }
    const updateUser: UpdateUser = {
      id,
      firstName,
      lastName,
      email,
    };
    usersService.updateUser(updateUser);
    return res.status(responseCodes.noContent).json({});
  },
};

/*   login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const users = usersService.getUserByEmail(email);
    if (!users) {
      return res.status(responseCodes.notFound).json({
        error: "Sellist kasutajat ei eksisteeri!",
      });
    }
    const match = await hashService.compare(password, users.password);
    if (!match) {
      return res.status(responseCodes.notFound).json({
        error: "Sisestatud parool on vale, proovi uuesti!",
      });
    }
    return res.status(responseCodes.ok).json({
      token: "token",
    });
  },
}; */

export default usersController;

//export { getUsers, getUserById, createUser, login };
