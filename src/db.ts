import { Result, NewResult } from "./components/result/interface";
import { Group, NewGroup } from "./components/group/interface";
import { Player, NewPlayer } from "./components/player/interface";
import { User, NewUser } from "./components/user/interface";
import { Game, NewGame } from "./components/game/interface";

interface Db {
  result: Result[];
  group: Group[];
  player: Player[];
  user: User[];
  game: Game[];
}

const db: Db = {
  result: [
    {
      id: "esimene",
      play: 1,
      table: 1,
      scoor: 16,
      win: 1,
      karvane: 1,
      saag: 1,
      saadudKarvane: 0,
      saadudSaag: 0,
    },
    {
      id: "teine",
      play: 2,
      table: 1,
      scoor: 10,
      win: 0,
      karvane: 0,
      saag: 0,
      saadudKarvane: 1,
      saadudSaag: 1,
    },
  ],
  group: [
    {
      id: "a",
      name: "Rock",
      description: "Allan ja Varts",
      created: "1. jaanuar",
    },
    {
      id: "ab",
      name: "Rootsi",
      description: "Imbi ja Pajaan",
      created: "2. jaanuar",
    },
  ],
  player: [
    {
      id: "essa",
      firstName: "Allan",
      lastName: "Murrand",
      telephone: 561548,
      email: "allanm@gmail.com",
      messenger: "alla",
      description: "Üks mängijatest",
      created: "1.jaanuar",
    },
    {
      id: "tessa",
      firstName: "Vardo",
      lastName: "Rohtmets",
      telephone: 561548,
      email: "vardu@gmail.com",
      messenger: "varts",
      description: "Teine mängijatest",
      created: "1.jaanuar",
    },
  ],
  user: [
    {
      id: "veel1",
      userName: "AllMurr",
      password: "jnilu",
      firstName: "Kristi",
      lastName: "Pruul",
      description: "Esimene kasutaja",
      created: "3.jaanuar",
    },
  ],
  game: [
    {
      id: "as",
      name: "Individuaalne",
      description: "Individuaalne arvestus",
      created: 2021,
    },
    {
      id: "asa",
      name: "Paarikas",
      description: "Paarisarvestus",
      created: 2021,
    },
  ],
};

export default db;
