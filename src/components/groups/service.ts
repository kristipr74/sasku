import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { IGroup, INewGroup, IUpdateGroup } from "./interface";

const groupsService = {
  getAllGroups: async (): Promise<IGroup[] | false> => {
    try {
      const [groups]: [IGroup[], FieldPacket[]] = await pool.query(
        "SELECT idgroups, name, description, created, createdBy FROM groups"
      );
      return groups;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getGroupById: async (id: number): Promise<IGroup | false> => {
    try {
      const [groups]: [IGroup[], FieldPacket[]] = await pool.query(
        "SELECT idgroups, name, description, created FROM groups WHERE id = ?",
        [id]
      );
      return groups[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  createGroup: async (newGroup: INewGroup): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO group SET ?",
        [newGroup]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

   removeGroup: async (id: number): Promise< boolean> => {
    try {
      await pool.query('UPDATE groups SET dataDeleted = ? WHERE id = ?', [new Date(), id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateGroup: async (groups: IUpdateGroup): Promise<boolean> => {
try {
  await pool.query('UPDATE groups SET name = ? WHERE id = ?', [groups.name, groups.id]);
  return true;
} catch (error) {
  console.log(error);
  return false;
}
    }
  };


export default groupsService;
