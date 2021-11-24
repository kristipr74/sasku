import express, { Application } from "express";

import authController from "./components/auth/Controller";

import pingController from "./components/ping/controller";
import playerRouter from "./components/player/routes";
import userRouter from "./components/user/routes";
import gameRouter from "./components/game/routes";
import groupRouter from "./components/group/routes";
import resultRouter from "./components/result/routes";

import { login } from "./components/user/controller";
import isLoggedIn from "./general/middlewares/isLoggedIn";

const app: Application = express();

const port: number = 3001;

//Midelware
app.use(express.json());

app.get("/ping", pingController);

/* -------------- LOGIN -------------- */
app.post("/login", login);

/* -------------- RESULT -------------- */
app.use("/result", resultRouter);

/* -------------- PLAYER -------------- */
app.use("/player", playerRouter);
//app.use("/player", isLoggedIn, playerRouter);

/* -------------- USER -------------- */
app.use("/user", userRouter);

/* -------------- GROUP -------------- */
app.use("/group", groupRouter);

/* -------------- GAME -------------- */
app.use("/game", gameRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
