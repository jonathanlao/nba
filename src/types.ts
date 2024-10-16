export interface Team {
  id: number;
  conference: string;
  division: string;
  city: string;
  full_name: string;
  name: string;
  abbreviation: string;
};

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height: string;
  weight: string;
  jersey_number: string;
  college: string;
  country: string;
  draft_year: number | null;
  draft_round: number | null;
  draft_number: number | null;
  team: Team;
}

export interface DraftRounds {
  "1": number;
  "2": number;
  "null": number;
}

export interface DraftPickTotal {
  team_name: string;
  draft_rounds: DraftRounds;
}

export interface Client {
  getTeams: () => Promise<Team[]>;
  getPlayersForTeam: (teamId: number, cursor?: number) => Promise<[Player[], number]>;
}
