import express, { Router } from "express";
import playerController from "./controller";
import playerService from "./service";

const router: Router = express.Router();

router
  .get("/", playerController.getAllPlayers)
  .get("/:id", playerController.getPlayerById)
  .post("/", playerController.createPlayer)
  .delete("/:id", playerController.removePlayer)
  .patch("/", playerController.updatePlayer);

export default router;
