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

//import { login } from "./components/users/controller";
import isLoggedIn from "./general/middlewares/isLoggedIn";

const app: Application = express();

const port: number = 3000;

//Midelware
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use("/ping", pingRouter);

/* -------------- LOGIN -------------- */
//app.post("/login", login);

/* -------------- RESULT -------------- */
app.use("/results", resultsRouter);

/* -------------- PLAYER -------------- */
app.use("/players", playersRouter);
//app.use("/player", isLoggedIn, playerRouter);

/* -------------- USER -------------- */
app.use("/users", usersRouter);

/* -------------- GROUP -------------- */
app.use("/groups", groupsRouter);

/* -------------- GAME -------------- */
app.use("/games", gamesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
