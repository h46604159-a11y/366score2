
export type Language = 'en' | 'ar';

export interface FixtureResponse {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: Score;
}

export interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: Venue;
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  round: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface Score {
  halftime: {
    home: number | null;
    away: number | null;
  };
  fulltime: {
    home: number | null;
    away: number | null;
  };
  extratime: {
    home: number | null;
    away: number | null;
  };
  penalty: {
    home: number | null;
    away: number | null;
  };
}

export interface Lineup {
  team: Team;
  formation: string;
  startXI: PlayerInfo[];
  substitutes: PlayerInfo[];
  coach: {
    id: number;
    name: string;
    photo: string;
  };
}

export interface PlayerInfo {
  player: {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string | null;
  };
}

export interface Statistic {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: StatDetail[];
}

export interface StatDetail {
  type: string;
  value: number | string | null;
}
