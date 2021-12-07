interface NewGroup {
  name: string;
  description: string;
  created: string;
}

interface Group extends NewGroup {
  id: number;
}

interface UpdateGroup {
  id: number;
  name: string;
}

export { Group, NewGroup, UpdateGroup };
