import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import playersService from "./service";
import { Player, NewPlayer, UpdatePlayer } from "./interface";

const playersController = {
  //Get player controller
  getAllPlayers: (req: Request, res: Response) => {
    const players: Player[] = playersService.getAllPlayers();
    return res.status(responseCodes.ok).json({
      players,
    });
  },

  //Get player by id controller
  getPlayerById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga Mängijat ei ole",
      });
    }
    const players = playersService.getPlayerById(id);
    if (!players) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id-ga - ${id} - Mängijat ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      players,
    });
  },

  //Create player controller
  createPlayer: (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      telephone,
      email,
      messenger,
      description,
      created,
    } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mängija eesnimi",
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mängija perekonnanimi",
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mänija meiliaadress",
      });
    }
    if (!telephone) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mänija telefoninumber",
      });
    }

    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mängija kirjeldus",
      });
    }
    if (!created) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mängija lisamise aeg",
      });
    }
    const newPlayer: NewPlayer = {
      firstName,
      lastName,
      telephone,
      email,
      messenger,
      description,
      created: "",
    };
    const id = playersService.createPlayer(newPlayer);

    return res.status(responseCodes.ok).json({
      id,
    });
  },

  removePlayer: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist Mängijat ei eksisteeri",
      });
    }
    const players: Player | undefined = playersService.getPlayerById(id);
    if (!players) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    playersService.removePlayer(players);
    return res.status(responseCodes.noContent).json({});
  },

  updatePlayer: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const {
      firstName,
      lastName,
      telephone,
      email,
      messenger,
      description,
      created,
    } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise nimega Mängijat ei eksisteeri",
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise nimega Mängijat ei eksisteeri",
      });
    }
    if (!telephone) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise telefoninumbriga Mängijat ei eksisteeri",
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise meiliaadressiga Mängijat ei eksisteeri",
      });
    }
    if (!messenger) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise messingeri nimega Mängijat ei eksisteeri",
      });
    }
    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise kirjeldusega Mängijat ei eksisteeri",
      });
    }
    if (!created) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellisel ajal loodud Mängijat ei eksisteeri",
      });
    }
    const players = playersService.getPlayerById(id);
    if (!players) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    const update: UpdatePlayer = {
      id,
      firstName,
      lastName,
      telephone,
      email,
      messenger,
      description,
      created,
    };
  },
};
export default playersController;
