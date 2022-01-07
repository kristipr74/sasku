import { RowDataPacket } from "mysql2";

interface INewRounds {
  roundCount: number;
  tableNumber: number;
}

interface IRounds extends INewRounds, RowDataPacket {
  idrounds: number;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

interface IUpdateRounds {
  idrounds: number;
  roundCount: number;
  tableNumber: number;
}

export { IRounds, INewRounds, IUpdateRounds };
