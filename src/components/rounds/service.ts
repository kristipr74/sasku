import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { IRounds, INewRounds, IUpdateRounds } from "./interface";

const roundsService = {
  getAllRounds: async (): Promise<IRounds[] | false> => {
    try {
      const [rounds]: [IRounds[], FieldPacket[]] = await pool.query(
        "SELECT idrounds, roundCount, tableNumber, dateCreated, dateUpdate FROM rounds WHERE rounds.dateDeleted IS NULL"
        //"SELECT idrounds, roundCount, tableNumber, dateCreated, dateUpdate FROM groups WHERE rounds.dateDeleted IS NULL"
      );
      return rounds;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getRoundsById: async (idrounds: number): Promise<IRounds | false> => {
    try {
      const [rounds]: [IRounds[], FieldPacket[]] = await pool.query(
        "SELECT idrounds, roundCount, tableNumber, dateCreated, dateUpdated FROM rounds WHERE idgroups = ? AND dateDeleted IS NULL",
        [idrounds]
      );
      return rounds[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  createRounds: async (newRounds: INewRounds): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO group SET roundCount = ?, tableName = ?",
        [newRounds.roundCount, newRounds.tableNumber]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  removeRounds: async (id: number): Promise<boolean> => {
    try {
      await pool.query("UPDATE rounds SET dateDeleted = ? WHERE idrounds = ?", [
        new Date(),
        id,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateRounds: async (rounds: IUpdateRounds): Promise<boolean> => {
    try {
      await pool.query("UPDATE rounds SET name = ? WHERE id = ?", [
        rounds.roundCount,
        rounds.tableNumber,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default roundsService;
