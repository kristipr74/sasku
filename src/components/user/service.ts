import db from "../../db";
import { User, NewUser } from "./interface";
import hashService from "../../general/services/hahshService";

const userService = {
  getUsers: () => {
    const { user } = db;
    return user;
  },
  getUserById: (id: number): User | undefined => {
    const user: User | undefined = db.user.find(
      (element: User) => element.id === id
    );
    return user;
  },
  getUserByEmail: (email: string): User | undefined => {
    const user = db.user.find((element) => element.email === email);
    return user;
  },
  createUser: async (newUser: NewUser):Promise<number> => {
    const id = db.user.length + 1;
    const hashedPassword = await hashService.hash(newUser.password);
    db.user.push({
      id,
      ...newUser,
      password: hashedPassword,
    });
    return id;
  },
};

export default userService;
