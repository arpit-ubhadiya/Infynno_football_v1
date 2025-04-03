import TrendingNews from "./components/trending-news";
import LiveMatchDashboard from "./components/live-match-dashboard";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row overflow-x-auto w-full h-full gap-6 pl-6">
      <LiveMatchDashboard />
      <TrendingNews />
    </div>
  )
}

