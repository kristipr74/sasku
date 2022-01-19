import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import resultsService from "./service";
import { INewResult, IUpdateResult } from "./interface";

const resultsController = {
  getAllResults: async (req: Request, res: Response) => {
    const results = await resultsService.getAllResult();
    return res.status(responseCodes.ok).json({
      results,
    });
  },

  getResultById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga tulemusi ei ole",
      });
    }
/*     const result = await resultsService.getResultById(id);
    if (!result) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id-ga - ${id} - tulemusi ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      result,
    }); */
  },

  createResult: async (req: Request, res: Response) => {
    const { result, win, karvane, saw, getKarvane, getSaw } = req.body;
    const resultId = res.locals.player.idplayer;

    const newResult: INewResult = {
      result,
      win,
      karvane,
      saw,
      getKarvane,
      getSaw,
      resultId,
    };
    const id = await resultsService.createdResult(newResult);
    if (!id) {
      return res.status(responseCodes.serverError).json({});
    }

    if (!result) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta saadud punktid",
      });
    }
    if (!win) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kas võitsid või kaotasid",
      });
    }
    if (!karvane) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kas tegid karvase",
      });
    }
    if (!saw) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta tegid sae",
      });
    }
    if (!getKarvane) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kas said karvase",
      });
    }
    if (!getSaw) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kas said sae",
      });
    }
    return res.status(responseCodes.ok).json({
      id,
    });
  },

  removeResult: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist tulemust ei eksisteeri",
      });
    }
    const result = await resultsService.getResultById(id);
    if (!result) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} mängu ei eksisteeri`,
      });
    }
    const resul = await resultsService.removeResult(id);
    if (!resul) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },

  /*   updateResult: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    // const { result } = req.body;
    // if (!result) {
    //   return res.status(responseCodes.badRequest).json({
    //     error: "Sellist mängu ei eksisteeri",
    //   });
    // }
    const result = await resultsService.getResultById(id);
    if (!result) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} tulemust ei eksisteeri`,
      });
    }
    const update: IUpdateResult = {
      idresult: id,
      result,
    };
    const result = await resultsService.updateResult(update);
    if (!result) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  }, */
};

export default resultsController;
