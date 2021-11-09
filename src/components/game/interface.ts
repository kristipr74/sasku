interface NewGame {
  name: string;
  description: string;
  created: number;
}

interface Game extends NewGame {
  id: string;
}
export { Game, NewGame };
