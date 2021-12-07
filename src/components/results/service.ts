import db from "../../db";
import { Result, NewResult, UpdateResult } from "./interface";

const resultsService = {
  getAllResult: () => {
    const { results } = db;
    return results;
  },
  getResultById: (id: number): Result | undefined => {
    const results: Result | undefined = db.results.find(
      (element: Result) => element.id === id
    );
    return results;
  },

  createdResult: (newResult: NewResult) => {
    const id = db.results.length + 1;
    const results: Result = {
      id,
      ...newResult,
    };

    db.results.push(results);
    return id;
  },
  removeResult: (id: number): boolean => {
    const index = db.results.findIndex((element) => element.id === id);
    db.results.splice(index, 1);

    return true;
  },

  updateResult: (results: UpdateResult) => {
    const index = db.results.findIndex((element) => element.id === results.id);
    if (index) {
      db.results[index].play = results.play;
    }
  },
};

export default resultsService;
