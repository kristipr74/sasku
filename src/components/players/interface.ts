interface INewPlayer {
  firstName: string;
  lastName: string;
  tel: number;
  email: string;
  password: string;
  messenger: string;
  description: string;
  created: string;
  role: "Admin" | "User";
}

interface IPlayer extends INewPlayer {
  id: number;
/*   dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null; */
}

interface IUpdatePlayer {
  id: number;
  firstName?: string;
  lastName?: string;
  tel?: number;
  email?: string;
  password?: string;
  messenger?: string;
  description?: string;
  created?: string;
  role?: "Admin" | "User";
}

export { IPlayer, INewPlayer, IUpdatePlayer };
