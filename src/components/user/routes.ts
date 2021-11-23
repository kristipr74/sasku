import express, { Router } from "express";
import { createUser, getUsers, getUserById } from "./controller";

const router: Router = express.Router();

router
.get('/', getUsers)
.get('/:id', getUserById)
.post('/', createUser)

export default router;