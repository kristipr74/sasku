import express, { Router } from "express";
import { createResult, getAllResult, getResultById } from "./controller";

const router: Router = express.Router();

router
  .get("/", getAllResult)
  .get("/:id", getResultById)
  .post("/", createResult);

export default router;
