import db from "../../db";
import { Game, NewGame, UpdateGame } from "./interface";

const gamesService = {
  getAllGames: () => {
    const { games } = db;
    return games;
  },

  getGameById: (id: number): Game | undefined => {
    const games: Game | undefined = db.games.find(
      (element: Game) => element.id === id
    );
    return games;
  },

  createGame: (newGame: NewGame) => {
    const id = db.games.length + 1;
    const games: Game = {
      id,
      ...newGame,
    };
    db.games.push(games);
    return id;
  },

  removeGame: (games: Game | undefined) => {
    if (games) {
      const index = db.games.findIndex((element) => element.id === games.id);
      db.games.splice(index, 1);
    }
    return true;
  },

  updateGroup: (games: UpdateGame) => {
    const index = db.games.findIndex((element) => element.id === games.id);
    if (index) {
      db.games[index].type = games.type;
    }
  },
};

export default gamesService;
