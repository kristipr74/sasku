import express, { Router } from "express";
import groupsController from "./controller";

import isLoggedIn from "../../general/middlewares/isLoggedIn";

const router: Router = express.Router();

router
  .get("/", isLoggedIn, groupsController.getAllGroups)
  .get("/:id", isLoggedIn, groupsController.getGroupById)
  .post("/", isLoggedIn, groupsController.createGroup)
  .delete("/:id", isLoggedIn, groupsController.removeGroup)
  .patch("/:id", isLoggedIn, groupsController.updateGroup);

export default router;
