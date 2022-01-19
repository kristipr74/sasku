import express, { Router } from "express";
import isAdmin from "../../general/middlewares/isAdmin";
import playersController from "./controller";

import isLoggedIn from "../../general/middlewares/isLoggedIn";

const router: Router = express.Router();

router
  //.get("/", isAdmin, playersController.getAllPlayers)
  .get("/", isLoggedIn, playersController.getAllPlayers)
  .get("/:id", isLoggedIn, playersController.getPlayerById)
  .post("/", isLoggedIn, playersController.createPlayer)
  .delete("/:id", isLoggedIn, playersController.deletePlayer)
  .patch("/:id", isLoggedIn, playersController.updatePlayer);

export default router;
