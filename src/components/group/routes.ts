import express, { Router } from "express";
import groupController from "./controller";

const router: Router = express.Router();

router
  .get("/", groupController.getAllGroups)
  .get("/:id", groupController.getGroupById)
  .post("/", groupController.createGroup)
  .delete("/:id", groupController.removeGroup)
  .patch("/", groupController.updateGroup);

export default router;
