import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import roundsService from "./service";
import { INewRounds, IUpdateRounds } from "./interface";


const roundsController = {
  //Get all groups controller
  getAllRounds: async (req: Request, res: Response) => {
    const rounds = await roundsService.getAllRounds();
    return res.status(responseCodes.ok).json({
      rounds,
    });
  },

  //Get group by id controller
  getRoundsById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga vooru ei ole",
      });
    }
    const rounds = await roundsService.getRoundsById(id);
    if (!rounds) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellist - ${id} - vooru ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      rounds,
    });
  },

  //Create group controller
  createRounds: async (req: Request, res: Response) => {
    const { roundCount, tableNumber } = req.body;
    const createdBy = res.locals.players.idplayer;
    if (!roundCount) {
      return res.status(responseCodes.badRequest).json({
        error: "Selline voor on juba kasutusel",
      });
    }
    if (!tableNumber) {
      return res.status(responseCodes.badRequest).json({
        error: "Selles voorus selle nr laud on juba kasutusel",
      });
    }
    const newRounds: INewRounds = {
      roundCount,
      tableNumber,
    };
    const idrounds = await roundsService.createRounds(newRounds);
    if (!idrounds) {
      return res.status(responseCodes.serverError).json({});
    }
    if (!tableNumber) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Grupi nimi",
      });
    }

    return res.status(responseCodes.ok).json({
      idrounds,
    });
  },

  removeRounds: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist vooru ei eksisteeri",
      });
    }
    const rounds = await roundsService.getRoundsById(id);
    if (!rounds) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} vooru ei eksisteeri`,
      });
    }
    const result = await roundsService.removeRounds(id);
    if (!result) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },

  updateRounds: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { roundCount, tableNumber } = req.body;
    if (!roundsController) {
      return res.status(responseCodes.badRequest).json({
        error: "Andmed ühtivad baasis olevatega",
      });
    }
    if (!tableNumber) {
      return res.status(responseCodes.badRequest).json({
        error: "Andmed ühtivad baasis olevatega",
      });
    }

    const rounds = await roundsService.getRoundsById(id);
    if (!rounds) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} vooru ei eksisteeri`,
      });
    }
    const update: IUpdateRounds = {
      idrounds: id,
      roundCount,
      tableNumber,
    };

    const result = await roundsService.updateRounds(update);
    if (!result) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default roundsController;
