
import { Image } from "@/lib/react-npm";
import { LeagueType, MatchType } from "@/types/fixtures";

export default function MatchSection({ league, leagueLogo, stage, matches }: LeagueType) {

  return (
    <div className="border border-[#171717] rounded-xl overflow-hidden">
      {/* Tournament Header */}
      <div className="bg-black p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={(leagueLogo + '?height=24&width=24')} width={24} height={24} alt={league} />
          <span className="text-white font-medium">{league}</span>
        </div>
        <span className="text-[#808080]">({stage})</span>
        <span></span>
      </div>

      {/* Matches */}
      <div className="divide-y divide-[#2c2c2c]">
        {matches.map((match, index: number) => (
          <MatchItem key={match.id} match={match} index={index} />
        ))}
      </div>
    </div>
  )
}
interface MatchItemProps {
  match: MatchType;
  index: number;
}

const MatchItem = ({ match, index }: MatchItemProps) => {
  return (
    <div className={`p-3 flex items-center ${index % 2 === 0 ? 'bg-[#2C2C2C]' : 'bg-[#222222]'}`}>
      <div className="w-16 text-white">
        {match.isLive ? <span className="text-primary-foreground">Live</span> : match.startTime}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-end flex-1 pr-3 gap-1">
          <span className="text-white mr-2">{match.homeTeam.name}</span>
          <Image src={match.homeTeam.logo + '?height=20&width=20'} width={20} height={20} alt={match.homeTeam.name} />
        </div>

        <div className="px-3 text-white">
          {`${match.homeTeam.score}-${match.awayTeam.score}`}
        </div>

        <div className="flex items-center justify-start flex-1 pl-3 gap-1">
          <Image src={match.awayTeam.logo + '?height=20&width=20'} width={20} height={20} alt={match.awayTeam.name} />
          <span className="text-white ml-2">{match.awayTeam.name}</span>
        </div>
      </div>
    </div>
  )
}

export const MatchSectionSkeleton = () => {
  return (
    <>
      {Array(3).fill(null).map((_, index) => (
        <div key={index} className="border border-[#171717] rounded-xl overflow-hidden">
          {/* Tournament Header */}
          <div className="bg-black p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-500 rounded-full animate-pulse" />
              <div className="h-4 w-32 bg-gray-500 rounded animate-pulse" />
            </div>
            <div className="w-16 h-4 bg-gray-500 rounded animate-pulse" />
            <span></span>
          </div>

          {/* Matches */}
          <div className="divide-y divide-[#2c2c2c]">
            {Array(3).fill(null).map((_, index) => (
              <MatchItemSkeleton key={index} />
            ))}
          </div>
        </div>))}
    </>
  )
}
const MatchItemSkeleton = () => {
  return (
    <div className="p-3 flex items-center bg-[#222222] animate-pulse">
      <div className="w-16 h-4 bg-gray-500 rounded animate-pulse" />

      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-end flex-1 pr-3">
          <div className="w-16 h-4 bg-gray-500 rounded animate-pulse" />
        </div>

        <div className="px-3">
          <div className="w-12 h-4 bg-gray-500 rounded animate-pulse" />
        </div>

        <div className="flex items-center justify-start flex-1 pl-3">
          <div className="w-16 h-4 bg-gray-500 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}