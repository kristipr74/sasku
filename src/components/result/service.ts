import { nanoid } from "nanoid";
import db from "../../db";
import {Result, NewResult} from "./interface";

const resultService = {
  getAllResult: () => {
    const { result } = db;
    return result;
  },
  getResultById: (id: string): Result | undefined => {
    const result: Result | undefined = db.result.find(
      (element: Result) => element.id === id
    );
    return result;
  },

  createdResult: (
    newResult: NewResult
  ): string => {
    const {       play,
      table,
      scoor,
      win,
      karvane,
      saag,
      saadudKarvane,
      saadudSaag } = newResult;
    const id = nanoid();
    const result: Result = {
      id,
      play,
      table,
      scoor,
      win,
      karvane,
      saag,
      saadudKarvane,
      saadudSaag,
    };
    db.result.push(result);
    return id;
  },
};

export default resultService;
