import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import gamesService from "./service";
import { Game, NewGame, UpdateGame } from "./interface";

const gamesController = {
  //Get all games controller
  getAllGames: (req: Request, res: Response) => {
    const games: Game[] = gamesService.getAllGames();
    return res.status(responseCodes.ok).json({
      games,
    });
  },

  //Get game by id controller
  getGameById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga mänge ei ole",
      });
    }
    const games = gamesService.getGameById(id);
    if (!games) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id-ga - ${id} - mänge ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      games,
    });
  },

  //Create game controller
  createGame: (req: Request, res: Response) => {
    const { date, type, description, location } = req.body;
    if (!date) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta sarja toimumise aeg",
      });
    }
    if (!type) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta sarja tüüp",
      });
    }
    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kirjeldus",
      });
    }
    if (!location) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta sarja toimumise koht"
      });
    }
    const newGame: NewGame = { date, type, description, location };
    const id = gamesService.createGame(newGame);

    return res.status(responseCodes.ok).json({
      id,
    });
  },

  removeGame: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist sarja ei eksisteeri",
      });
    }
    const games: Game | undefined = gamesService.getGameById(id);
    if (!games) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} sarja ei eksisteeri`,
      });
    }
    gamesService.removeGame(games);
    return res.status(responseCodes.noContent).json({});
  },

  updateGame: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { type } = req.body;
    if (!type) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist nimega sarja ei eksisteeri",
      });
    }
    const games = gamesService.getGameById(id);
    if (!games) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Gruppi ei eksisteeri`,
      });
    }
    const update: UpdateGame = {
      id,
      type,
    };
  },
};

export default gamesController;
