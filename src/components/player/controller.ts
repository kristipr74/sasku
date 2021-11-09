import { Request, Response } from "express";
import playerService from "./service";
import { Player, NewPlayer } from "./interface";

//Get player controller
const getAllPlayers = (req: Request, res: Response) => {
  const player: Player[] = playerService.getAllPlayers();
  return res.status(200).json({
    player,
  });
};

//Get player by id controller
const getPlayerById = (req: Request, res: Response) => {
  const { id } = req.params;
  const player = playerService.getPlayerById(id);
  if (!player) {
    return res.status(400).json({
      mesaage: `Sellise id-ga - ${id} - mängijat ei ole!`,
    });
  }
  return res.status(200).json({
    player,
  });
};

//Create player controller
const createPlayer = (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    telephone,
    email,
    messenger,
    description,
    created,
  } = req.body;
  const newPlayer: NewPlayer = {
    firstName,
    lastName,
    telephone,
    email,
    messenger,
    description,
    created,
  };
  const id: string = playerService.createPlayer(newPlayer);
  return res.status(200).json({
    id,
  });
};

export { getAllPlayers, getPlayerById, createPlayer };
