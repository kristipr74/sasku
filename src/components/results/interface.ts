interface NewResult {
  play: number;
  table: number;
  result: number;
  win: "1" | "0";
  karvane: "1" | "0";
  saag: "1" | "0";
  saadudKarvane: "1" | "0";
  saadudSaag: "1" | "0";
}

interface Result extends NewResult {
  id: number;
}

interface UpdateResult {
  id: number;
  play: number;
  /*   table: number;
  scoor: number;
  win: number;
  karvane: number;
  saag: number;
  saadudKarvane: number;
  saadudSaag: number; */
}

export { Result, NewResult, UpdateResult };
