interface NewGroup {
  name: string;
  description: string;
  created: string;
}

interface Group extends NewGroup {
  id: string;
}

export { Group, NewGroup };
