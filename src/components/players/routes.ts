import express, { Router } from "express";
import playersController from "./controller";
import playersService from "./service";

const router: Router = express.Router();

router
  .get("/", playersController.getAllPlayers)
  .get("/:id", playersController.getPlayerById)
  .post("/", playersController.createPlayer)
  .delete("/:id", playersController.removePlayer)
  .patch("/", playersController.updatePlayer);

export default router;
