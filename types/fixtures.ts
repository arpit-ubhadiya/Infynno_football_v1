// Type for a single team
export interface Team {
  name: string;
  logo: string;
  score: number;
}

// Type for a single match
export interface MatchType {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string; // The match start time
  isLive: boolean;
  isEnded: boolean;
}

// Type for the league data (including the stage and matches)
export interface LeagueType {
  id: string;
  league: string;
  leagueLogo: string;
  state: string;
  stage: string;
  venue: string;
  matches: MatchType[]; // Array of matches for this stage of the league
}

// Type for the full API response
export interface FixturesResponse {
  data: LeagueType[]; // Array of leagues with their matches
  message: string;
}