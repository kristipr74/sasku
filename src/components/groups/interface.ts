import { RowDataPacket } from "mysql2";

interface INewGroup {
  name: string;
  description: string;
  created: string;
  createdBy: number,
  playersId: number;
}

interface IGroup extends INewGroup, RowDataPacket {
  id: number;
}

interface IUpdateGroup {
  id: number;
  name: string;
}

export { IGroup, INewGroup, IUpdateGroup };
