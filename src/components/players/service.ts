import db from "../../db";
import { Player, NewPlayer, UpdatePlayer } from "./interface";

const playersService = {
  getAllPlayers: () => {
    const { players } = db;
    return players;
  },

  getPlayerById: (id: number): Player | undefined => {
    const players: Player | undefined = db.players.find(
      (element: Player) => element.id === id
    );
    return players;
  },

  createPlayer: (newPlayer: NewPlayer): number => {
    const id = db.games.length + 1;
    const players: Player = {
      id,
      ...newPlayer,
    };
    db.players.push(players);
    return id;
  },

  removePlayer: (players: Player | undefined) => {
    if (players) {
      const index = db.players.findIndex((element) => element.id === players.id);
      db.players.splice(index, 1);
    }
    return true;
  },
};

export default playersService;
