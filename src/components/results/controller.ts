import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import resultsService from "./service";
import { Result, NewResult, UpdateResult } from "./interface";

const resultsController = {
  getAllResults: (req: Request, res: Response) => {
    const results: Result[] = resultsService.getAllResult();
    return res.status(responseCodes.ok).json({
      results,
    });
  },

  getResultById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga tulemusi ei ole",
      });
    }
    const results = resultsService.getResultById(id);
    if (!results) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise id-ga - ${id} - tulemusi ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      results,
    });
  },

  createResult: (req: Request, res: Response) => {
    const {
      play,
      table,
      result,
      win,
      karvane,
      saag,
      saadudKarvane,
      saadudSaag,
    } = req.body;
    if (!play) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta vooru number",
      });
    }
    if (!table) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta laua number",
      });
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
    if (!saag) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta tegid sae",
      });
    }
    if (!saadudKarvane) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kas said karvase",
      });
    }
    if (!saadudSaag) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta kas said sae",
      });
    }
    const newResult: NewResult = {
      play,
      table,
      result,
      win,
      karvane,
      saag,
      saadudKarvane,
      saadudSaag,
    };
    const id = resultsService.createdResult(newResult);

    return res.status(responseCodes.ok).json({
      id,
    });
  },

  removeResult: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist mängu ei eksisteeri",
      });
    }
    const results = resultsService.getResultById(id);
    if (!results) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} mängu ei eksisteeri`,
      });
    }
    resultsService.removeResult(id);
    return res.status(responseCodes.noContent).json({});
  },

  updateResult: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { play } = req.body;
    if (!play) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist mängu ei eksisteeri",
      });
    }
    const results = resultsService.getResultById(id);
    if (!results) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} tulemust ei eksisteeri`,
      });
    }
    const update: UpdateResult = {
      id,
      play,
    };
  },
};

export default resultsController;
