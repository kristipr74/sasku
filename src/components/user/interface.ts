interface NewUser {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  description: string;
  created: string;
}

interface User extends NewUser {
  id: string;
}

export { User, NewUser };
