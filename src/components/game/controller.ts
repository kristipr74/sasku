import { Request, Response } from "express";
import gameService from "./service";
import { Game, NewGame } from "./interface";

//Get all games controller
const getAllGames = (req: Request, res: Response) => {
  const game: Game[] = gameService.getAllGames();
  return res.status(200).json({
    game,
  });
};

//Get game by id controller
const getGameById = (req: Request, res: Response) => {
  const { id } = req.params;
  const game = gameService.getGameById(id);
  if (!game) {
    return res.status(400).json({
      message: `Sellise id-ga - ${id} - mänge ei ole!`,
    });
  }
  return res.status(200).json({
    game,
  });
};

//Create game controller
const createGame = (req: Request, res: Response) => {
  const { name, description, created } = req.body;
  const newGame: NewGame = { name,
    description,
    created,
  };
  const id: string = gameService.createGame( newGame)
  return res.status(200).json({
    id,
  });
};

export { getAllGames, getGameById, createGame };
