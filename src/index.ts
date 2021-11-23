import express, { Application } from "express";

import authController from "./components/auth/Controller";

import pingController from "./components/ping/controller";
import resultService from "./components/result/service";
import playerRouter from "./components/player/routes";
import userRouter from "./components/user/routes";
import gameRouter from "./components/game/routes";
import groupRouter from "./components/group/routes";
import resultRouter from "./components/result/routes";

import {login } from './components/user/controller'

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
app.post("/login", login);

/* -------------- RESULT -------------- */
app.use("/result", resultRouter);

/* -------------- PLAYER -------------- */
app.use("/player", playerRouter);

/* -------------- USER -------------- */
app.use("/user", userRouter);

/* -------------- GROUP -------------- */
app.use("/group", groupRouter);

/* -------------- GAME -------------- */
app.use("/game", gameRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
