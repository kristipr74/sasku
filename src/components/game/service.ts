import { nanoid } from "nanoid";
import db from "../../db";
import {Game, NewGame} from "./interface";

const gameService = {
  getAllGames: () => {
    const { game } = db;
    return game;
  },
  getGameById: (id: string): Game | undefined => {
    const game: Game | undefined = db.game.find(
      (element: Game) => element.id === id
    );
    return game;
  },
  createGame: (newGame: NewGame): string => {
    const { name, description, created } = newGame;
    const id = nanoid();
    const game: Game = {
      id,
      name,
      description,
      created,
    };
    db.game.push(game);
    return id;
  },
};

export default gameService;
