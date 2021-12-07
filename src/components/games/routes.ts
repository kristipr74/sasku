import express, { Router } from "express";
import gamesController from "./controller";
import gamesService from "./service";

const router: Router = express.Router();

router
  .get("/", gamesController.getAllGames)
  .get("/:id", gamesController.getGameById)
  .post("/", gamesController.createGame)
  .delete("/:id", gamesController.removeGame)
  .patch("/", gamesController.updateGame);

export default router;
