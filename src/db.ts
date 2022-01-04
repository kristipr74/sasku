import { Result, NewResult } from "./components/results/interface";
import { User, NewUser } from "./components/users/interface";
import { Game, NewGame } from "./components/games/interface";

interface Db {
  results: Result[];
  users: User[];
  games: Game[];
}

const db: Db = {
  results: [
    {
      id: 1,
      play: 1,
      table: 1,
      result: 16,
      win: "1",
      karvane: "1",
      saag: "0",
      saadudKarvane: "1",
      saadudSaag: "1",
    },
    {
      id: 2,
      play: 2,
      table: 1,
      result: 10,
      win: "1",
      karvane: "0",
      saag: "1",
      saadudKarvane: "0",
      saadudSaag: "1",
    },
  ],
/*   groups: [
    {
      id: 1,
      name: "Rock",
      description: "Allan ja Varts",
      created: "2021-12-01",
    },
    {
      id: 2,
      name: "Rootsi",
      description: "Imbi ja Pajaan",
      created: "2021-12-02",
    },
  ], */
  // players: [
  //   {
  //     id: 1,
  //     firstName: "Kristi",
  //     lastName: "Pruul",
  //     tel: 561548,
  //     email: "kristi@gmail.com",
  //     password: "$2b$10$PXaNnUDAxKX44h16s6IFc.DodT5c9SF3Rw4T2LTDbp6xmlCFX6LZe",
  //     messenger: "alla",
  //     description: "Üks mängijatest",
  //     created: "1.jaanuar",
  //     role: "Admin",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Allan ",
  //     lastName: "Murrand",
  //     tel: 561548,
  //     email: "vardu@gmail.com",
  //     password: "$2b$10$CLlc/3ZfL5LlYvZMVG.eZu8T53Z67FvbMpjVbzkecDM/DD7lhzmja",
  //     messenger: "varts",
  //     description: "Teine mängijatest",
  //     created: "1.jaanuar",
  //     role: "User",
  //   },
  // ],
  users: [
    {
      id: 1,
      firstName: "Kristi",
      lastName: "Pruul",
      description: "Esimene kasutaja",
      created: "2021-12-01",
      email: "kristi@gmail.com",
      password: "$2b$10$PXaNnUDAxKX44h16s6IFc.DodT5c9SF3Rw4T2LTDbp6xmlCFX6LZe",
      role: "Admin",
    },
    {
      id: 2,
      firstName: "Allan",
      lastName: "Murrand",
      description: "Teine kasutaja",
      created: "2021-12-01",
      email: "alla@gmail.com",
      password: "$2b$10$CLlc/3ZfL5LlYvZMVG.eZu8T53Z67FvbMpjVbzkecDM/DD7lhzmja",
      role: "User",
    },
  ],
  games: [
    {
      id: 1,
      date: "2021-12-01",
      type: "Individuaal",
      description: "Individuaalne arvestus",
      location: "Muu",
    },
    {
      id: 2,
      date: "2021-12-02",
      type: "Paarikas",
      description: "Paarisarvestus",
      location: "Willy",
    },
    {
      id: 3,
      date: "2021-12-03",
      type: "Suvesari",
      description: "Suvesari",
      location: "Willy",
    },
  ],
};

export default db;
