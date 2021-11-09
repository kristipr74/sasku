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

import pingController from "./components/ping/controller";

const app: Application = express();

const port: Number = 3100;

//Midelware
app.use(express.json());

app.get("/ping", pingController);

//Rout to get all results
app.get("/result", getAllResult);
//Rout to get results by id
app.get("/result/:id", getResultById);
//Rout to create results
app.post("/result", createResult);
//Rout to get all players
app.get("/player", getAllPlayers);
//Rout to get player by id
app.get("/player/:id", getPlayerById);
//Rout to create Player
app.post("/player", createPlayer);
//Rout to get all users
app.get("/user", getAllUsers);
//Route to get user by id
app.get("/user/:id", getUserById);
//Rout to create User
app.post("/user", createUser);
//Rout to get all groups
app.get("/group", getAllGroups);
//Route to get group by id
app.get("/group/:id", getGroupById);
//Rout to create group
app.post("/group", createGroup);
//Rout to get all games
app.get("/game", getAllGames);
//Route to get games by id
app.get("/game/:id", getGameById);
//Rout to create game
app.post("/game", createGame);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
