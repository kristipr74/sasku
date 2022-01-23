import db from "../../db";
import { User, NewUser, UpdateUser } from "./interface";
import hashService from "../../general/services/hahshService";

const usersService = {
  getAllUsers: () => {
    const { users } = db;
    return users;
  },

  getUserById: (id: number): User | undefined => {
    const users: User | undefined = db.users.find(
      (element: User) => element.id === id
    );
    return users;
  },

  getUserByEmail: (email: string): User | undefined => {
    const users = db.users.find((element) => element.email === email);
    return users;
  },

  removeUser: (id: number): boolean => {
    const index = db.users.findIndex((element) => element.id === id);
    db.users.splice(index, 1);
    return true;
  },

  createUser: async (newUser: NewUser): Promise<number> => {
    const id = db.users.length + 1;
    const hashedPassword = await hashService.hash(newUser.password);
    db.users.push({
      id,
      ...newUser,
      password: hashedPassword,
    });
    return id;
  },
  updateUser: (users: UpdateUser): boolean => {
    const { id, firstName, lastName, email } = users;
    const index = db.users.findIndex((element) => element.id === id);
    if (firstName) {
      db.users[index].firstName = firstName;
    }
    if (lastName) {
      db.users[index].lastName = lastName;
    }
    if (email) {
      db.users[index].email = email;
    }
    return true;
  },
};

export default usersService;
