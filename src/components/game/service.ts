import db from "../../db";
import { Game, NewGame, UpdateGame } from "./interface";

const gameService = {
  getAllGames: () => {
    const { game } = db;
    return game;
  },

  getGameById: (id: number): Game | undefined => {
    const game: Game | undefined = db.game.find(
      (element: Game) => element.id === id
    );
    return game;
  },

  createGame: (newGame: NewGame) => {
    const id = db.game.length + 1;
    const game: Game = {
      id,
      ...newGame,
    };
    db.game.push(game);
    return id;
  },

  removeGame: (game: Game | undefined) => {
    if (game) {
      const index = db.game.findIndex((element) => element.id === game.id);
      db.game.splice(index, 1);
    }
    return true;
  },

  updateGroup: (game: UpdateGame) => {
    const index = db.game.findIndex((element) => element.id === game.id);
    if (index) {
      db.game[index].name = game.name;
    }
  },
};

export default gameService;
