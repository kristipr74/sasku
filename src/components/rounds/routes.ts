import express, { Router } from "express";
import roundsController from "./controller";
import isLoggedIn from "../../general/middlewares/isLoggedIn";

const router: Router = express.Router();

router
  .get("/", isLoggedIn, roundsController.getAllRounds)
  .get("/:id", isLoggedIn, roundsController.getRoundsById)
  .post("/", isLoggedIn, roundsController.createRounds)
  .delete("/:id", isLoggedIn, roundsController.removeRounds)
  .patch("/", isLoggedIn, roundsController.updateRounds);

export default router;
