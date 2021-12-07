import { Result, NewResult } from "./components/results/interface";
import { Group, NewGroup } from "./components/groups/interface";
import { Player, NewPlayer } from "./components/players/interface";
import { User, NewUser } from "./components/users/interface";
import { Game, NewGame } from "./components/games/interface";

interface Db {
  results: Result[];
  groups: Group[];
  players: Player[];
  users: User[];
  games: Game[];
}

const db: Db = {
  results: [
    {
      id: 1,
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
      id: 2,
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
  groups: [
    {
      id: 1,
      name: "Rock",
      description: "Allan ja Varts",
      created: "1. jaanuar",
    },
    {
      id: 2,
      name: "Rootsi",
      description: "Imbi ja Pajaan",
      created: "2. jaanuar",
    },
  ],
  players: [
    {
      id: 1,
      name: "Allan Murrand",
      telephone: 561548,
      email: "allanm@gmail.com",
      messenger: "alla",
      description: "Üks mängijatest",
      created: "1.jaanuar",
    },
    {
      id: 2,
      name: "Vardo Rohtmets",
      telephone: 561548,
      email: "vardu@gmail.com",
      messenger: "varts",
      description: "Teine mängijatest",
      created: "1.jaanuar",
    },
  ],
  users: [
    {
      id: 1,
      firstName: "Kristi",
      lastName: "Pruul",
      description: "Esimene kasutaja",
      created: "3.jaanuar",
      email: "krist@gmail.com",
      password: "$2b$10$PXaNnUDAxKX44h16s6IFc.DodT5c9SF3Rw4T2LTDbp6xmlCFX6LZe",
      role: "Admin",
    },
    {
      id: 2,
      firstName: "Allan",
      lastName: "Murrand",
      description: "Teine kasutaja",
      created: "3.jaanuar",
      email: "alla@gmail.com",
      password: "$2b$10$CLlc/3ZfL5LlYvZMVG.eZu8T53Z67FvbMpjVbzkecDM/DD7lhzmja",
      role: "User",
    },
  ],
  games: [
    {
      id: 1,
      name: "Individuaalne",
      description: "Individuaalne arvestus",
      year: 2021,
    },
    {
      id: 2,
      name: "Paarikas",
      description: "Paarisarvestus",
      year: 2021,
    },
  ],
};

export default db;
