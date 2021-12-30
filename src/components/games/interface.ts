interface NewGame {
  date: string;
  type: "Paarikas" | "Suvesari" | "Individuaal";
  description: string;
  location: "Willy" | "Muu";
}

interface Game extends NewGame {
  id: number;
}

interface UpdateGame {
  id: number;
  type: "Paarikas" | "Suvesari" | "Individuaal";
}

export { Game, NewGame, UpdateGame };
