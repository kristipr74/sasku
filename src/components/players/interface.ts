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
  id: number;
}

interface UpdatePlayer {
  id: number;
  firstName?: string;
  lastName?: string;
  telephone?: number;
  email: string;
  messenger?: string;
  description?: string;
  created?: string;
}

export { Player, NewPlayer, UpdatePlayer };
