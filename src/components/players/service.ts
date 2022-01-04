import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { IPlayer, INewPlayer, IUpdatePlayer } from "./interface";
import hashService from "../../general/services/hahshService";

const playersService = {
  getAllPlayers: async (): Promise<IPlayer[] | false> => {
    try {
      const [players]: [IPlayer[], FieldPacket[]] = await pool.query(
        "SELECT idplayers, firstname, lastname, tel, email, password, messenger, description, created FROM players;"
      );
      return players;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getPlayerById: async (id: number): Promise<IPlayer | false> => {
    try {
      const [player]: [IPlayer[], FieldPacket[]] = await pool.query(
        "SELECT idplayers, firstname, lastname, email, description, created FROM players WHERE id = ?",
        [id]
      );
      return player[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getPlayersByEmail: async (email: string): Promise<IPlayer | false> => {
    try {
      const [players]: [IPlayer[], FieldPacket[]] = await pool.query(
        "SELECT * FROM players WHERE email = ?",
        [email]
      );
      console.log(players[0]);
      return players[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  createPlayer: async (newPlayer: INewPlayer): Promise<number | false> => {
    try {
      const hashedPassword = await hashService.hash(newPlayer.password);
      const player = {
        ...newPlayer,
        password: hashedPassword,
      };
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO players SET ?;",
        [player]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  deletePlayer: async (id: number): Promise<boolean> => {
    try {
      await pool.query("UPDATE players SET dataDeleted = ? WHERE idplayers = ?", [
        new Date(),
        id,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updatePlayer: async (player: IUpdatePlayer): Promise<boolean> => {
    try {
      const playerToUpdate = { ...player };
      if (player.password)
        playerToUpdate.password = await hashService.hash(player.password);
      const result = await pool.query("UPDATE players SET ? WHERE idplayers = ?", [
        playerToUpdate,
        player.idplayers,
      ]);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default playersService;
