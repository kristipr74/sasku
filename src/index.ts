import express, { Application } from "express";

import {
  getAllResult,
  getResultById,
  createResult,
} from "./components/result/controller";

import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
} from "./components/player/controller";

import {
  getAllUsers,
  getUserById,
  createUser,
} from "./components/user/controller";
import {
  getAllGroups,
  getGroupById,
  createGroup,
} from "./components/group/controller";

import {
  getAllGames,
  getGameById,
  createGame,
} from "./components/game/controller";

import authController from "./components/auth/Controller";

import pingController from "./components/ping/controller";
import resultService from "./components/result/service";

const app: Application = express();

const port: number = 3000;

const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

//Midelware
app.use(express.json());

app.get("/ping", pingController);

/* -------------- LOGIN -------------- */
app.post("/login", authController.login);

/* -------------- RESULT -------------- */
app.get("/result", getAllResult);
app.get("/result/:id", getResultById);
app.post("/result", createResult);

/* -------------- PLAYER -------------- */
app.get("/player", getAllPlayers);
app.get("/player/:id", getPlayerById);
app.post("/player", createPlayer);

/* -------------- USER -------------- */
app.get("/user", getAllUsers);
app.get("/user/:id", getUserById);
app.post("/user", createUser);

/* -------------- GROUP -------------- */
app.get("/group", getAllGroups);
app.get("/group/:id", getGroupById);
app.post("/group", createGroup);

/* -------------- GAME -------------- */
app.get("/game", getAllGames);
app.get("/game/:id", getGameById);
app.post("/game", createGame);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
