import { RowDataPacket } from "mysql2";

interface INewGroup {
  name: string;
  description?: string;
  createdBy: number;
}

interface IGroup extends INewGroup, RowDataPacket {
  idgroups: number;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

interface IUpdateGroup {
  idgroups: number;
  name: string;
  description?: string;
}

export { IGroup, INewGroup, IUpdateGroup };
