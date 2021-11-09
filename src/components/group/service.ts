import { nanoid } from "nanoid";
import db from "../../db";
import { Group, NewGroup } from "./interface";

const groupService = {
  getAllGroups: () => {
    const { group } = db;
    return group;
  },
  getGroupById: (id: string): Group | undefined => {
    const group: Group | undefined = db.group.find(
      (element: Group) => element.id === id
    );
    return group;
  },
  createGroup: (newGroup: NewGroup): string => {
    const { name, description, created } = newGroup;
    const id = nanoid();
    const group: Group = {
      id,
      name,
      description,
      created,
    };
    db.group.push(group);
    return id;
  },
};

export default groupService;
