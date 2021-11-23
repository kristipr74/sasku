import express, { Router } from "express";
import { createGame, getAllGames, getGameById } from "./controller";

const router: Router = express.Router();

router.get("/", getAllGames).get("/:id", getGameById).post("/", createGame);

export default router;
