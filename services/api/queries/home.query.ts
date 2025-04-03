import { useQuery, UseQueryOptions } from "@/lib/npm";
import { fetchFixturesByDate } from "../axios/client/home.service";
import { LeagueType } from "@/types/fixtures";


type QuatationalOptions = Omit<UseQueryOptions<LeagueType[], Error>, 'queryKey' | 'queryFn'>;
export const useFixturesQuery = ({ date, search }: { date: string, search: string }, quatational?: QuatationalOptions) => {
  return useQuery<LeagueType[], Error>({
    queryKey: ['fixtures', date, search],
    queryFn: () => fetchFixturesByDate(date, search),
    ...quatational,
  });
};