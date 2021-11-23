import express, { Router } from "express";
import { createGroup, getAllGroups, getGroupById } from "./controller";

const router: Router = express.Router();

router.get("/", getAllGroups).get("/:id", getGroupById).post("/", createGroup);

export default router;
