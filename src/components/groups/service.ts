import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { IGroup, INewGroup, IUpdateGroup } from "./interface";

const groupsService = {
  getAllGroups: async (): Promise<IGroup[] | false> => {
    try {
      const [groups]: [IGroup[], FieldPacket[]] = await pool.query(
        "SELECT idgroups, name, description, dateCreated, dateUpdated FROM groups WHERE groups.dateDeleted IS NULL"
      );
      return groups;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getGroupById: async (idgroups: number): Promise<IGroup | false> => {
    try {
      const [groups]: [IGroup[], FieldPacket[]] = await pool.query(
        "SELECT idgroups, name, description, dateCreated, dateUpdated FROM groups WHERE idgroups = ? AND dateDeleted IS NULL",
        [idgroups]
      );
      return groups[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },

/*   getGroupByName: async (groupName: string): Promise<IGroup | false> => {
    try {
      const [groups]: [IGroup[], FieldPacket[]] = await pool.query(
        "SELECT idgroups, name, description, dateCreated, dateUpdated FROM groups WHERE name = ? AND dateDeleted IS NULL",
        [groupName]
      );
      return groups[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }, */

  createGroup: async (newGroup: INewGroup): Promise<number | false> => {
    try {
      const group = {
        ...newGroup,
      };
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO groups SET ?",
        [group]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  removeGroup: async (idgroups: number): Promise<boolean> => {
    try {
      await pool.query("UPDATE groups SET dateDeleted = ? WHERE idgroups = ?", [
        new Date(),
        idgroups,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateGroup: async (groups: IUpdateGroup): Promise<boolean> => {
    try {
      await pool.query("UPDATE groups SET name = ? WHERE idgroups = ?", [
        groups.name,
        groups.idgroups,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default groupsService;
