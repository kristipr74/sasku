import { Request, Response } from "express";
import resultService from "./service";
import {Result, NewResult} from "./interface";

//Get result controller
const getAllResult = (req: Request, res: Response) => {
  const result: Result[] = resultService.getAllResult();
  return res.status(200).json({
    result,
  });
};

//Get result by id controller
const getResultById = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = resultService.getResultById(id);
  if (!result) {
    return res.status(400).json({
      message: `Sellise id-ga - ${id} - tulemust ei ole!: `,
    });
  }

  return res.status(200).json({
    result,
  });
};

//Create result controller
const createResult = (req: Request, res: Response) => {
  const { play, table, scoor, win, karvane, saag, saadudKarvane, saadudSaag } =
    req.body;
   const newResult: NewResult = {     play,
    table,
    scoor,
    win,
    karvane,
    saag,
    saadudKarvane,
    saadudSaag, }; 
  const id: string = resultService.createdResult( newResult );
  return res.status(200).json({
    id,
  });
};

export { getAllResult, getResultById, createResult };
