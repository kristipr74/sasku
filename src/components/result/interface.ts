interface Result {
  id: string;
  play: number;
  table: number;
  scoor: number;
  win: number;
  karvane: number;
  saag: number;
  saadudKarvane: number;
  saadudSaag: number;
}

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

export { Result, NewResult };
