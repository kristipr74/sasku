import express, { Router } from "express";
import groupsController from "./controller";

const router: Router = express.Router();

router
  .get("/", groupsController.getAllGroups)
  .get("/:id", groupsController.getGroupById)
  .post("/", groupsController.createGroup)
  .delete("/:id", groupsController.removeGroup)
  .patch("/", groupsController.updateGroup);

export default router;
