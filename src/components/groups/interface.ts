import { RowDataPacket } from "mysql2";

interface INewGroup {
  name: string;
  description?: string;
}

interface IGroup extends INewGroup, RowDataPacket {
  idgroups: number;
  dateCreated: Date;
  dateUpdated: Date;
  dateleted: Date | null;
}

interface IUpdateGroup {
  idgroups: number;
  name: string;
  description?: string;
}

export { IGroup, INewGroup, IUpdateGroup };
