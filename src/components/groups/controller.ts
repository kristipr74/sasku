import { Request, Response } from "express";
import responseCodes from "../../general/responseCodes";
import groupsService from "./service";
import { INewGroup, IUpdateGroup } from "./interface";

const groupsController = {
  //Get all groups controller
  getAllGroups: async (req: Request, res: Response) => {
    const groups = await groupsService.getAllGroups();
    return res.status(responseCodes.ok).json({
      groups,
    });
  },

  //Get group by id controller
  getGroupById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellise id-ga gruppi ei ole",
      });
    }
    return res.status(responseCodes.ok).json({
      id,
    });
  },

  /*   //Get group by name controller
  getGroupByName: async (req: Request, res: Response) => {
    // const id: number = parseInt(req.params.id, 10);
    // const group = await groupsService.getGroupByName(id);
    const groupName: string = req.body;
    console.log(groupName);
    if (!groupName) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.ok).json({
      groupName,
    });
  }, */

  //Create group controller
  createGroup: async (req: Request, res: Response) => {
    const { name, description } = req.body;
    //const createdBy = res.locals.players.idplayers;
    console.log(res.locals.players);
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Selline Grupi nimi on juba kasutusel",
      });
    }
    const newGroup: INewGroup = {
      name,
      description,
    };
    const idgroups = await groupsService.createGroup(newGroup);
    if (!idgroups) {
      return res.status(responseCodes.serverError).json({});
    }
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
    return res.status(responseCodes.created).json({
      idgroups,
    });
  },

  removeGroup: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "Sellist Gruppi ei eksisteeri",
      });
    }
    const groups = await groupsService.getGroupById(id);
    if (!groups) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Gruppi ei eksisteeri`,
      });
    }
    const result = await groupsService.removeGroup(id);
    if (!result) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },

  updateGroup: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: "Sisesta nimi mida muuta! ",
      });
    }
    const groups = await groupsService.getGroupById(id);
    if (!groups) {
      return res.status(responseCodes.badRequest).json({
        error: `Sellise  id - ga ${id} Gruppi ei eksisteeri`,
      });
    }
    const update: IUpdateGroup = {
      idgroups: id,
      name,
    };

    const result = await groupsService.updateGroup(update);
    if (!result) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default groupsController;
