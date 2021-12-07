interface NewResult {
  play: number;
  table: number;
  scoor: number;
  win: number;
  karvane: number;
  saag: number;
  saadudKarvane: number;
  saadudSaag: number;
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
