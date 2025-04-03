import { _STATUS_CODE } from "@/constant/responseConstant";
import { FixturesResponse } from "@/types/fixtures";

interface ApiResponseFromSportMonks {
  data: Fixture[];
  message: string;
}

interface Fixture {
  name: string;
  starting_at: string;
  id: number;
  sport_id: number;
  round_id: number;
  stage_id: number;
  group_id: null | number;
  aggregate_id: null | number;
  league_id: number;
  season_id: number;
  venue_id: number;
  state_id: number;
  starting_at_timestamp: number;
  league: League;
  venue: Venue;
  state: State;
  round: Round;
  season: Season;
  scores: Score[];
  participants: Participant[];
  stage: StageDetails;
}

interface League {
  id: number;
  sport_id: number;
  country_id: number;
  name: string;
  image_path: string;
}

interface Venue {
  id: number;
  city_id: number;
  country_id: number;
  name: string;
}

interface State {
  id: number;
  state: string;
  name: string;
  short_name: string;
  developer_name: string;
}

interface Round {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  name: string;
  finished: boolean;
  is_current: boolean;
  starting_at: string;
  ending_at: string;
  games_in_current_week: boolean;
}

interface Season {
  id: number;
  sport_id: number;
  league_id: number;
  tie_breaker_rule_id: number;
  name: string;
  finished: boolean;
  pending: boolean;
  is_current: boolean;
  starting_at: string;
  ending_at: string;
  standings_recalculated_at: string;
  games_in_current_week: boolean;
}

interface Score {
  id: number;
  type_id: number;
  fixture_id: number;
  participant_id: number;
  score: {
    goals: number;
    participant: "home" | "away";
  };
  description: string;
}

interface Participant {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number;
  name: string;
  image_path: string;
  meta: {
    location: "home" | "away";
    winner: boolean;
    position: number;
  };
}

interface StageDetails {
  id: number;
  type_id: number;
  season_id: number;
  sport_id: number;
  league_id: number;
  name: string;
}

export async function GET(request: Request) {
  const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;

  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  const search = url.searchParams.get('search');
  const sortBy = url.searchParams.get('sort_by') || 'starting_at';
  const order = url.searchParams.get('order') || 'asc'; // asc, desc

  const API_URL = `https://api.sportmonks.com/v3/football/fixtures/date/${date}?api_token=${API_TOKEN}
    &include=league:name,image_path;
    venue:name;
    state;
    round;
    season;
    scores:score,
    description;
    participants:name,image_path;
    stage:name;
    &select=name,starting_at
    &filters=scoreTypes:1525;leagueNames:${search};
    &sortBy=${sortBy}
    &order=${order}`;

  try {

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: ApiResponseFromSportMonks = await response.json();

    if (!data?.data || data?.data.length === 0) {
      return Response.json({ message: "No fixtures found", data: [], notificationFlag: true });
    }

    const groupedFixtures = data?.data.reduce((acc, fixture) => {
      const {
        id,
        league,
        venue,
        state,
        starting_at,
        // starting_at_timestamp,
        participants,
        scores,
        stage,
      } = fixture;

      const homeTeam = participants.find(team => team.meta.location === "home");
      const awayTeam = participants.find(team => team.meta.location === "away");

      if (!homeTeam || !awayTeam) {
        return acc; // Skip if home or away team is not found
      }

      const homeScoreObj = scores.find(score => score.participant_id === homeTeam.id);
      const awayScoreObj = scores.find(score => score.participant_id === awayTeam.id);

      const homeScore = homeScoreObj?.score.goals ?? '';
      const awayScore = awayScoreObj?.score.goals ?? '';

      const date = new Date(starting_at);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      const match = {
        id,
        homeTeam: {
          name: homeTeam.name,
          logo: homeTeam.image_path,
          score: homeScore,
        },
        awayTeam: {
          name: awayTeam.name,
          logo: awayTeam.image_path,
          score: awayScore,
        },
        startTime: formattedTime,
        isLive: [2, 3, 6, 9, 22].includes(state.id), // https://docs.sportmonks.com/football/definitions/states
        isEnded: [5, 7, 8].includes(state.id), // https://docs.sportmonks.com/football/definitions/states
      };

      const groupKey = `${league.id}-${stage.name}`;
      if (!acc[groupKey]) {
        acc[groupKey] = {
          id: groupKey,
          league: league.name,
          leagueLogo: league.image_path,
          state: state.name,
          stage: stage.name,
          venue: venue.name,
          matches: [],
        };
      }
      acc[groupKey].matches.push(match);
      return acc;
    }, {} as Record<string, any>);

    const responseData: FixturesResponse = {
      data: Object.values(groupedFixtures),
      message: "Fixtures fetched successfully"
    }

    if (!!search) {
      responseData.data = responseData.data.filter((league) => (
        league.league.toLowerCase().includes(search.toLowerCase())
        || league.matches.some((match) => (
          match.homeTeam.name.toLowerCase().includes(search.toLowerCase())
          || match.awayTeam.name.toLowerCase().includes(search.toLowerCase())
        )
        )
      )
      );
    }

    return Response.json(responseData, { status: _STATUS_CODE.OK });

  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message, data: [] }, { status: _STATUS_CODE.INTERNAL_SERVER_ERROR })
  }

}