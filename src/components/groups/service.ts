import db from "../../db";
import { Group, NewGroup, UpdateGroup } from "./interface";

const groupsService = {
  getAllGroups: () => {
    const { groups } = db;
    return groups;
  },

  getGroupById: (id: number): Group | undefined => {
    const groups: Group | undefined = db.groups.find(
      (element: Group) => element.id === id
    );
    return groups;
  },

  createGroup: (newGroup: NewGroup) => {
    const id = db.groups.length + 1;
    const groups: Group = {
      id,
      ...newGroup,
    };
    db.groups.push(groups);
    return id;
  },

  removeGroup: (groups: Group | undefined) => {
    if (groups) {
      const index = db.groups.findIndex((element) => element.id === groups.id);
      db.groups.splice(index, 1);
    }
    return true;
  },

  updateGroup: (groups: UpdateGroup) => {
    const index = db.groups.findIndex((element) => element.id === groups.id);
    if (index) {
      db.groups[index].name = groups.name;
    }
  },
};

export default groupsService;
