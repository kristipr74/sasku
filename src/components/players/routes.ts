import express, { Router } from "express";
import isAdmin from "../../general/middlewares/isAdmin";
import playersController from "./controller";

const router: Router = express.Router();

router
  .get("/", isAdmin, playersController.getAllPlayers)
  .get("/", playersController.getAllPlayers)
  .get("/:id", playersController.getPlayerById)
  .post("/", playersController.createPlayer)
  .delete("/:id", playersController.deletePlayer)
  .patch("/", playersController.updatePlayer);

export default router;
