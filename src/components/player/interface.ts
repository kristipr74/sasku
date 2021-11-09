interface NewPlayer {
  firstName: string;
  lastName: string;
  telephone: number;
  email: string;
  messenger: string;
  description: string;
  created: string;
}

interface Player extends NewPlayer {
  id: string;
}

export { Player, NewPlayer };
