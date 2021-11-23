interface NewUser {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  description: string;
  created: string;
  email: string;
  role: "Admin" | "User";
}

interface User extends NewUser {
  id: number;
}

interface UpdateUser {
  id: number;
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: "Admin" | "User";
}

export { User, NewUser, UpdateUser };
