import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import playerService from "./service";
import { Player, NewPlayer, UpdatePlayer } from "./interface";

const playerController = {
  //Get player controller
  getAllPlayers: (req: Request, res: Response) => {
    const player: Player[] = playerService.getAllPlayers();
    return res.status(responseCodes.ok).json({
      player,
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
    const player = playerService.getPlayerById(id);
    if (!player) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id-ga - ${id} - Mängijat ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      player,
    });
  },

  //Create player controller
  createPlayer: (req: Request, res: Response) => {
    const { name, telephone, email, messenger, description } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mängija nimi",
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
    const newPlayer: NewPlayer = {
      name,
      telephone,
      email,
      messenger,
      description,
      created: "",
    };
    const id = playerService.createPlayer(newPlayer);

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
    const player: Player | undefined = playerService.getPlayerById(id);
    if (!player) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    playerService.removePlayer(player);
    return res.status(responseCodes.noContent).json({});
  },

  updatePlayer: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name, telephone, email, messenger, description } = req.body;
    if (!name) {
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
    const player = playerService.getPlayerById(id);
    if (!player) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    const update: UpdatePlayer = {
      id,
      name,
      telephone,
      email,
      messenger,
      description,
    };
  },
};
export default playerController;
