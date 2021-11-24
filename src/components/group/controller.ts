import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import groupService from "./service";
import { Group, NewGroup, UpdateGroup } from "./interface";

const groupController = {
  //Get all groups controller
  getAllGroups: (req: Request, res: Response) => {
    const group: Group[] = groupService.getAllGroups();
    return res.status(responseCodes.ok).json({
      group,
    });
  },

  //Get group by id controller
  getGroupById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga gruppi ei ole",
      });
    }
    const group = groupService.getGroupById(id);
    if (!group) {
      return res.status(responseCodes.badRequest).json({
        message: `Sellise nimega - ${id} - gruppi ei ole!`,
      });
    }
    return res.status(responseCodes.ok).json({
      group,
    });
  },

  //Create group controller
  createGroup: (req: Request, res: Response) => {
    const { name, description, created } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Grupi nimi",
      });
    }
    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Mänijate nimed",
      });
    }
    if (!created) {
      return res.status(responseCodes.badRequest).json({
        error: "Palun sisesta Grupi grupi loomise aeg",
      });
    }
    const newGroup: NewGroup = { name, description, created };
    const id = groupService.createGroup(newGroup);

    return res.status(responseCodes.ok).json({
      id,
    });
  },

  removeGroup: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist Gruppi ei eksisteeri",
      });
    }
    const group: Group | undefined = groupService.getGroupById(id);
    if (!group) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Gruppi ei eksisteeri`,
      });
    }
    groupService.removeGroup(group);
    return res.status(responseCodes.noContent).json({});
  },

  updateGroup: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist nimega Gruppi ei eksisteeri",
      });
    }
    const group = groupService.getGroupById(id);
    if (!group) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Gruppi ei eksisteeri`,
      });
    }
    const update: UpdateGroup = {
      id,
      name,
    };
  },
};

export default groupController;
