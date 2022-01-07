import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import openapi from "./openapi.json";

import authController from "./components/auth/Controller";

import pingRouter from "./components/ping/routes";
import playersRouter from "./components/players/routes";
import usersRouter from "./components/users/routes";
import gamesRouter from "./components/games/routes";
import groupsRouter from "./components/groups/routes";
import resultsRouter from "./components/results/routes";
import roundsRouter from "./components/rounds/routes";
import isLoggedIn from "./general/middlewares/isLoggedIn";
import playersController from "./components/players/controller";

const app: Application = express();

//Midelware
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use("/ping", pingRouter);

/* -------------- LOGIN -------------- */
app.post("/login", authController.login);
app.post("/players", playersController.createPlayer);

app.use(isLoggedIn);

/* -------------- RESULT -------------- */
app.use("/results", resultsRouter);

/* -------------- PLAYER -------------- */
app.use("/players", playersRouter);

/* -------------- USER -------------- */
app.use("/users", usersRouter);

/* -------------- GROUP -------------- */
app.use("/groups", groupsRouter);

/* -------------- GAME -------------- */
app.use("/games", gamesRouter);

/* -------------- ROUNDS -------------- */
app.use("/rounds", roundsRouter);


export default app;
