import { nanoid } from "nanoid";
import db from "../../db";
import {Player, NewPlayer} from "./interface";

const playerService = {
  getAllPlayers: () => {
    const { player } = db;
    return player;
  },
  getPlayerById: (id: string): Player | undefined => {
    const player: Player | undefined = db.player.find(
      (element: Player) => element.id === id
    );
    return player;
  },
  createPlayer: (newPlayer: NewPlayer): string => {
    const { firstName, lastName, telephone, email, messenger, description, created } = newPlayer;
    const id = nanoid();
  const player: Player = {
    id,
    firstName,
    lastName,
    telephone,
    email,
    messenger,
    description,
    created,
  };
  db.player.push(player);
  return id;
  },
};

export default playerService;
