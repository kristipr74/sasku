import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import playersService from "./service";
import { INewPlayer, IUpdatePlayer } from "./interface";
import hashService from "../../general/services/hahshService";
import jwtService from "../../general/services/jwtService";
import isAdmin from "../../general/middlewares/isAdmin";

const playersController = {
  //Get player controller
  getAllPlayers: async (req: Request, res: Response) => {
    const players = await playersService.getAllPlayers();
    return res.status(responseCodes.ok).json({
      players,
    });
  },

  //Get player by id controller
  getPlayerById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga Mängijat ei ole",
      });
    }
    if (
      id === res.locals.players.id ||
      res.locals.players.role === "Admin"
    ) {
      const player = playersService.getPlayerById(id);
      if (!player) {
        return res.status(responseCodes.badRequest).json({
          message: `Sellise - ${id} -ga  kasutajat ei ole!`,
        });
      }
      return res.status(responseCodes.ok).json({
        player,
      });
    }

    return res.status(responseCodes.notAuthorized).json({
      error: "Sul ei ole sellise tegevuse jaoks õigusi",
    });
  },

  //Create player controller
  createPlayer: async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      tel,
      email,
      password,
      messenger,
      description,
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
    if (!tel) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mänija telefoninumber",
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mänija meiliaadress",
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun parool",
      });
    }
    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mängija kirjeldus",
      });
    }
    const newPlayer: INewPlayer = {
      firstName,
      lastName,
      tel,
      email,
      password,
      messenger,
      description,
      role: "User",
    };
    const id = await playersService.createPlayer(newPlayer);
    return res.status(responseCodes.created).json({
      idplayer: id,
    });
  },

  deletePlayer: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist Mängijat ei eksisteeri",
      });
    }
    const player = playersService.getPlayerById(id);
    if (!player) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    const response = await playersService.deletePlayer(id);
    if (!response) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },

  updatePlayer: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const {
      firstName,
      lastName,
      tel,
      email,
      password,
      messenger,
      description,
      role,
    } = req.body;
    const isAdmin = res.locals.player.role == "Admin";
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id kasutajat ei ole",
      });
    }
    if (
      !firstName &&
      !lastName &&
      !tel &&
      !email &&
      !password &&
      !messenger &&
      !description
    ) {
      return res.status(responseCodes.badRequest).json({
        error: "Pole midagi uuendada",
      });
    }

    const player = playersService.getPlayerById(id);
    if (!player) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    const updatePlayer: IUpdatePlayer = {
      idplayers: id,
    };
    if (firstName) updatePlayer.firstName = firstName;
    if (lastName) updatePlayer.lastName = lastName;
    if (tel) updatePlayer.tel = tel;
    if (email) updatePlayer.email = email;
    if (messenger) updatePlayer.messenger = messenger;
    if (description) updatePlayer.description = description;
    if (role && isAdmin)
      updatePlayer.role = role === "Admin" ? "Admin" : "User";
    const result = await playersService.updatePlayer(updatePlayer);
    if (!result) {
      res.status(responseCodes.serverError).json({});
    }

    return res.status(responseCodes.noContent).json({});
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const players = await playersService.getPlayersByEmail(email);
    if (!players) {
      return res.status(responseCodes.notFound).json({
        error: "Sellist kasutajat ei eksisteeri!",
      });
    }
    /*     // const match = await hashService.compare(password, players.password);
    if (!match) {
  
      return res.status(responseCodes.notFound).json({
        error: "Sisestatud parool on vale, proovi uuesti!",
      });
    } */
    const token = await jwtService.sign(players);
    return res.status(responseCodes.ok).json({
      token: "token",
    });
  },
};

export default playersController;
