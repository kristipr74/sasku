import express, { Router } from "express";
import resultsController from "./controller";
import resultsService from "./service";

const router: Router = express.Router();

router
  .get("/", resultsController.getAllResults)
  .get("/:id", resultsController.getResultById)
  .post("/", resultsController.createResult)
  .delete("/:id", resultsService.removeResult)
  .patch("/", resultsService.updateResult);

export default router;
