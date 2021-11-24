import db from "../../db";
import { Group, NewGroup, UpdateGroup } from "./interface";

const groupService = {
  getAllGroups: () => {
    const { group } = db;
    return group;
  },

  getGroupById: (id: number): Group | undefined => {
    const group: Group | undefined = db.group.find(
      (element: Group) => element.id === id
    );
    return group;
  },

  createGroup: (newGroup: NewGroup) => {
    const id = db.group.length + 1;
    const group: Group = {
      id,
      ...newGroup,
    };
    db.group.push(group);
    return id;
  },

  removeGroup: (group: Group | undefined) => {
    if (group) {
      const index = db.group.findIndex((element) => element.id === group.id);
      db.group.splice(index, 1);
    }
    return true;
  },

  updateGroup: (group: UpdateGroup) => {
    const index = db.group.findIndex((element) => element.id === group.id);
    if (index) {
      db.group[index].name = group.name;
    }
  },
};

export default groupService;
