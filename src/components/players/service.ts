import { RowDataPacket, FieldPacket, ResultSetHeader } from "mysql2";
import db from "../../db";
import { IPlayer, INewPlayer, IUpdatePlayer } from "./interface";
import hashService from "../../general/services/hahshService";
import pool from "../../database";

const playersService = {
  getAllPlayers: async (): Promise<RowDataPacket[]> => {
    const [players]: [RowDataPacket[], FieldPacket[]] = await pool.query(
      "SELECT id, firstname, lastname, tel, email, password, messenger, description, created FROM players;"
    );

    return players;
  },

  getPlayerById: (id: number): IPlayer | undefined => {
    const players: IPlayer | undefined = db.players.find(
      (element: IPlayer) => element.id === id
    );
    return players;
  },

  getPlayersByEmail: async(email: string): Promise<RowDataPacket | false> => {
try {
const [players]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM players WHERE email = ?, [email] ');
return players[0];
} catch (error) {
  console.log(error);
  return false;
}

  },

  createPlayer: async (newPlayer: INewPlayer): Promise<number | false> => {
    try {
      const id = db.players.length + 1;
      const hashedPassword = await hashService.hash(newPlayer.password);
      const player: IPlayer = {
        id,
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

  removePlayer: (players: IPlayer | undefined) => {
    if (players) {
      const index = db.players.findIndex(
        (element) => element.id === players.id
      );
      db.players.splice(index, 1);
    }
    return true;
  },

/*      updatePlayer: (players: IUpdatePlayer) => {
    const index = db.players.findIndex((element) => element.id === players.id);
    if (index) {
      db.players[index].email = players.email;
    }
  },  */
};

export default playersService;
