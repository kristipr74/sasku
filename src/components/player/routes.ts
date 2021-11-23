import express, { Router } from "express";
import { createPlayer, getAllPlayers, getPlayerById } from "./controller";

const router: Router = express.Router();

router
.get('/', getAllPlayers)
.get('/:id', getPlayerById)
.post('/', createPlayer)

export default router;