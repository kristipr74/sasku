import express, { Router } from "express";
import resultsController from "./controller";
import resultsService from "./service";

import isLoggedIn from "../../general/middlewares/isLoggedIn";

const router: Router = express.Router();

router
  .get("/", resultsController.getAllResults)
  .get("/:id", resultsController.getResultById)
  .post("/", isLoggedIn, resultsController.createResult)
  .delete("/:id", isLoggedIn, resultsService.removeResult)
  .patch("/", isLoggedIn, resultsService.updateResult);

export default router;
