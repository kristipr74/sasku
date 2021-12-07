import express, { Router } from "express";
import usersController from "./controller";

const router: Router = express.Router();

router
.get('/', usersController.getAllUsers)
.get('/:id', usersController.getUserById)
.post('/', usersController.createUser)
.delete('/:id', )

export default router;