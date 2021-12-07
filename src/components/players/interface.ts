interface NewPlayer {
  name: string;
  telephone: number;
  email: string;
  messenger: string;
  description: string;
  created: string;
}

interface Player extends NewPlayer {
  id: number;
}

interface UpdatePlayer {
  id: number;
  name: string;
  telephone: number;
  email: string;
  messenger: string;
  description: string;
}

export { Player, NewPlayer, UpdatePlayer };
