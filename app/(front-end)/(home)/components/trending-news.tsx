import { Bookmark, ChevronRight } from "lucide-react";
import { Image } from "@/lib/react-npm";
import TrendingNewsItem from "./trending-news-item";

export default function TrendingNews() {

  const trendingNewsData = [
    {
      title: 'Results And Scores From The Premier League...!!',
      date: '09 Oct 2023, 02:00 PM',
      imageUrl: 'https://cdn.sportmonks.com/images/soccer/teams/22/246.png',
    },
    {
      title: 'Results And Scores From The Premier League...!!',
      date: '09 Oct 2023, 02:00 PM',
      imageUrl: 'https://cdn.sportmonks.com/images/soccer/teams/22/246.png',
    },
    {
      title: 'Results And Scores From The Premier League...!!',
      date: '09 Oct 2023, 02:00 PM',
      imageUrl: 'https://cdn.sportmonks.com/images/soccer/teams/22/246.png',
    },
  ]

  return (
    <div className="bg-sidebar rounded-[20px] w-full lg:w-[360px]">
      <div className="rounded-3xl px-4 py-7 h-full overflow-y-auto">

        <div className="flex justify-between items-center !mb-4">
          <h1 className="font-bold text-[25px] leading-[100%] tracking-[0%] capitalize">Trending News</h1>
          <ChevronRight className="text-primary-foreground w-6 h-6" />
        </div>

        <div className="!mb-6">
          <div className="relative rounded-[20px]">
            <Image src={'/images/trending.png'} alt="Premier League celebration" width={500} height={300} className="w-full object-cover rounded-xl" />
          </div>

          <div className="flex !mt-2">
            <div className="flex-1">
              <h2 className="font-bold text-lg leading-[100%] tracking-[0%] capitalize">Results And Scores From The Premier League...!!</h2>
              <div className="flex items-center justify-between py-2">
                <p className="font-normal text-sm leading-[100%] tracking-[0%] capitalize text-muted-foreground">5 Hours Ago</p>
              </div>
            </div>
            <Bookmark className="text-primary-foreground fill-primary-foreground w-6 h-6" />
          </div>
        </div>

        <div className="!space-y-4 ">
          {trendingNewsData.map((item) => <TrendingNewsItem key={item.title} {...item} />)}
        </div>
      </div>
    </div>
  )
}