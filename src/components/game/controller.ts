import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import gameService from "./service";
import { Game, NewGame, UpdateGame } from "./interface";

const gameController = {
  //Get all games controller
  getAllGames: (req: Request, res: Response) => {
    const game: Game[] = gameService.getAllGames();
    return res.status(responseCodes.ok).json({
      game,
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
    const game = gameService.getGameById(id);
    if (!game) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id-ga - ${id} - mänge ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      game,
    });
  },

  //Create game controller
  createGame: (req: Request, res: Response) => {
    const { name, description, created } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta sarja nimi",
      });
    }
    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mänijate nimed",
      });
    }
    if (!created) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta sarja grupi loomise aeg",
      });
    }
    const newGame: NewGame = { name, description, created };
    const id = gameService.createGame(newGame);

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
    const game: Game | undefined = gameService.getGameById(id);
    if (!game) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} sarja ei eksisteeri`,
      });
    }
    gameService.removeGame(game);
    return res.status(responseCodes.noContent).json({});
  },

  updateGame: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist nimega sarja ei eksisteeri",
      });
    }
    const game = gameService.getGameById(id);
    if (!game) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Gruppi ei eksisteeri`,
      });
    }
    const update: UpdateGame = {
      id,
      name,
    };
  },
};

export default gameController;
