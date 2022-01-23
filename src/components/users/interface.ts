/* 
 USERS INTERFACE
  */

interface NewUser {
  firstName: string;
  lastName: string;
  description: string;
  created: string;
  email: string;
  password: string;
  role: "Admin" | "User";
}

interface User extends NewUser {
  id: number;
}

interface UpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: "Admin" | "User";
}

export { User, NewUser, UpdateUser };
