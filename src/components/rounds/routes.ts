import express, { Router } from "express";
import roundsController from "./controller";

const router: Router = express.Router();

router
  .get("/", roundsController.getAllRounds)
  .get("/:id", roundsController.getRoundsById)
  .post("/", roundsController.createRounds)
  .delete("/:id", roundsController.removeRounds)
  .patch("/", roundsController.updateRounds);

export default router;
