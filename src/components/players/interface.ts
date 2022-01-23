import { RowDataPacket } from "mysql2";

interface INewPlayer {
  firstName: string;
  lastName: string;
  tel?: number;
  email?: string;
  password: string;
  messenger?: string;
  description?: string;
  role: "Admin" | "User";
}

interface IPlayer extends INewPlayer, RowDataPacket {
  idplayers: number;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

interface IUpdatePlayer {
  idplayers: number;
  firstName?: string;
  lastName?: string;
  tel?: number;
  email?: string;
  password?: string;
  messenger?: string;
  description?: string;
  role?: "Admin" | "User";
}

export { IPlayer, INewPlayer, IUpdatePlayer };
