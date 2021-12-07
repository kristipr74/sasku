import express, { Router } from "express";
import isAdmin from "../../general/middlewares/isAdmin";
import usersController from "./controller";

const router: Router = express.Router();

router
.get('/', isAdmin, usersController.getAllUsers)
.get('/:id', usersController.getUserById)
.post('/', usersController.createUser)
.delete('/:id', )

export default router;