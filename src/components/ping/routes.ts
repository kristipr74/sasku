import express, { Router } from "express";
import pingController from "./controller";

const router: Router = express.Router();

router
  .get("/", pingController);

export default router;