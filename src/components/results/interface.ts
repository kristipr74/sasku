import { RowDataPacket } from "mysql2";

interface INewResult {
  result: number;
  win: "1" | "0";
  karvane: "1" | "0";
  saw: "1" | "0";
  getKarvane: "1" | "0";
  getSaw: "1" | "0";
  resultId: number;
}

interface IResult extends INewResult, RowDataPacket {
  idresult: number;
}

interface IUpdateResult {
  idresult: number;
  result: number;
  win: number;
  karvane: number;
  saag: number;
  saadudKarvane: number;
  saadudSaag: number;
}

export { IResult, INewResult, IUpdateResult };
