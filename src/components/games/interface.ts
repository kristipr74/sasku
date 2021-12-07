interface NewGame {
  name: string;
  description: string;
  year: number;
}

interface Game extends NewGame {
  id: number;
}

interface UpdateGame {
  id: number;
  name: string;
}

export { Game, NewGame, UpdateGame };
