import { Request, Response } from "express";
import hashService from "../../general/services/hahshService";
import responseCodes from "../../general/responseCodes";
import playersService from "./service";
import { IPlayer, INewPlayer, IUpdatePlayer } from "./interface";
import jwtService from "../../general/services/jwtService";

const playersController = {
  //Get player controller
  getAllPlayers: async (req: Request, res: Response) => {
    const players = await playersService.getAllPlayers();
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
    if (id === res.locals.players.id || res.locals.players.role === "Admin") {
      const players = playersService.getPlayerById(id);
      if (!players) {
        return res.status(responseCodes.badRequest).json({
          message: `Sellise - ${id} -ga  kasutajat ei ole!`,
        });
      }
      return res.status(responseCodes.ok).json({
        players,
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
      created,
      role,
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
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta palun parool",
      });
    }
    if (!tel) {
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
    const newPlayer: INewPlayer = {
      firstName,
      lastName,
      tel,
      email,
      password,
      messenger,
      description,
      created: "",
      role: "User",
    };
    const id = await playersService.createPlayer(newPlayer);
    if (!id) {
      return res.status(500).json({
       error: 'Selline kasutaja on juba olemas!'
      });
    }

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
    const players: IPlayer | undefined = playersService.getPlayerById(id);
    if (!players) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    playersService.removePlayer(players);
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
      created,
      role,
    } = req.body;
    const isAdmin = res.locals.players.role == "Admin";
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
      !description &&
      !created
    ) {
      return res.status(responseCodes.badRequest).json({
        error: "Pole midagi uuendada",
      });
    }

    const players = playersService.getPlayerById(id);
    if (!players) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Mängijat ei eksisteeri`,
      });
    }
    const updatePlayer: IUpdatePlayer = {
      id,
    };
    if (firstName) updatePlayer.firstName = firstName;
    if (lastName) updatePlayer.lastName = lastName;
    if (tel) updatePlayer.tel = tel;
    if (email) updatePlayer.email = email;
    if (messenger) updatePlayer.messenger = messenger;
    if (description) updatePlayer.description = description;
    if (created) updatePlayer.created = created;
    if (role && isAdmin)
      updatePlayer.role = role === "Admin" ? "Admin" : "User";
    // const result = await playersService.updatePlayer(updatePlayer);
    // if (!result) {
    //   res.status(responseCodes.serverError).json({});
    // }

    return res.status(responseCodes.noContent).json({});
  },
}

 /* const login: async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const players = await playersService.getPlayersByEmail(email);
  if (!players) {
    return res.status(responseCodes.notFound).json({
      error: "Sellist kasutajat ei eksisteeri!",
    });
  }
  const match = await hashService.compare(password, players.password);
  if (!match) {

    return res.status(responseCodes.notFound).json({
      error: "Sisestatud parool on vale, proovi uuesti!",
    });
  }
  const token = await jwtService.sign(players)
  return res.status(responseCodes.ok).json({
    token: "token",
  }); 
} */

export default playersController;
