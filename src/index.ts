import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import openapi from "./openapi.json";


import authController from "./components/auth/Controller";

import pingRouter from "./components/ping/routes";
import playerRouter from "./components/player/routes";
import userRouter from "./components/user/routes";
import gameRouter from "./components/game/routes";
import groupRouter from "./components/group/routes";
import resultRouter from "./components/result/routes";

import { login } from "./components/user/controller";
import isLoggedIn from "./general/middlewares/isLoggedIn";

const app: Application = express();

const port: number = 3000;

//Midelware
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use("/ping", pingRouter);

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
