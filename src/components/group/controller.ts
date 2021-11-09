import { Request, Response } from "express";
import groupService from "./service";
import { Group, NewGroup } from "./interface";

//Get all groups controller
const getAllGroups = (req: Request, res: Response) => {
  const group: Group[] = groupService.getAllGroups();
  return res.status(200).json({
    group,
  });
};

//Get group by id controller
const getGroupById = (req: Request, res: Response) => {
  const { id } = req.params;
  const group = groupService.getGroupById(id);
  if (!group) {
    return res.status(400).json({
      message: `Sellise nimega - ${id} - gruppi ei ole!`,
    });
  }
  return res.status(200).json({
    group,
  });
};

//Create group controller
const createGroup = (req: Request, res: Response) => {
  const { name, description, created } = req.body;
  const newGroup: NewGroup = { name, description, created };
  const id: string = groupService.createGroup(newGroup);

  return res.status(200).json({
    id,
  });
};

export { getAllGroups, getGroupById, createGroup };
