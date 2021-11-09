import { nanoid } from "nanoid";
import db from "../../db";
import { User, NewUser } from "./interface";

const userService = {
  getAllUsers: () => {
    const { user } = db;
    return user;
  },
  getUserById: (id: string): User | undefined => {
    const user: User | undefined = db.user.find(
      (element: User) => element.id === id
    );
    return user;
  },
  createUser: (newUser: NewUser): string => {
    const { userName, password, firstName, lastName, description, created } =
      newUser;
    const id = nanoid();
    const user: User = {
      id,
      userName,
      password,
      firstName,
      lastName,
      description,
      created,
    };
    db.user.push(user);
    return id;
  },
};

export default userService;
