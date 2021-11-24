import express, { Router } from "express";
import gameController from "./controller";
import gameService from "./service";

const router: Router = express.Router();

router
  .get("/", gameController.getAllGames)
  .get("/:id", gameController.getGameById)
  .post("/", gameController.createGame)
  .delete("/:id", gameController.removeGame)
  .patch("/", gameController.updateGame);

export default router;
