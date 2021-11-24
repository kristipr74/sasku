import db from "../../db";
import { Player, NewPlayer, UpdatePlayer } from "./interface";

const playerService = {
  getAllPlayers: () => {
    const { player } = db;
    return player;
  },
  
  getPlayerById: (id: number): Player | undefined => {
    const player: Player | undefined = db.player.find(
      (element: Player) => element.id === id
    );
    return player;
  },

  createPlayer: (newPlayer: NewPlayer): number => {
    const id = db.game.length + 1;
    const player: Player = {
      id,
      ...newPlayer,
    };
    db.player.push(player);
    return id;
  },

  removePlayer: (player: Player | undefined) => {
    if (player) {
      const index = db.player.findIndex((element) => element.id === player.id);
      db.player.splice(index, 1);
    }
    return true;
  },
};

export default playerService;
