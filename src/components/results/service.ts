import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { IResult, INewResult, IUpdateResult } from "./interface";

const resultsService = {
  getAllResult: async (): Promise<IResult[] | false> => {
    try {
      const [results]: [IResult[], FieldPacket[]] = await pool.query(
        "SELECT idresults, win, karvane, getKarvane, saw, getSaw FROM results"
      );
      return results;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getResultById: async (id: number): Promise<IResult | false> => {
    try {
      const [result]: [IResult[], FieldPacket[]] = await pool.query(
        "SELECT idresults, win, karvane, getKarvane, saw, getSaw FROM results WHERE id = ?",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  createdResult: async (newResult: INewResult): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO results SET ?",
        [newResult]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeResult: async (id: number): Promise<boolean> => {
    try {
      await pool.query("UPDATE results SET dataDeleted = ? WHERE id = ?", [
        new Date(),
        id,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateResult: async (results: IUpdateResult): Promise<boolean> => {
    try {
      await pool.query("UPDATE results SET result = ? WHERE idresult = ?", [
        results.result,
        results.idresult,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default resultsService;
