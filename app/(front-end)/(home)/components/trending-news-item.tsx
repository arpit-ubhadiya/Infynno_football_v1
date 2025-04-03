
import { Image } from "@/lib/react-npm";
import { Bookmark } from "lucide-react";

interface TrendingNewsItemProps {
  title: string;
  imageUrl: string;
  date: string;
}

export default function TrendingNewsItem({ title, imageUrl, date }: TrendingNewsItemProps) {

  return (

    <div className="flex gap-3">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image
          src={`${imageUrl}?height=96&width=96`}
          alt="Football stadium"
          width={96}
          height={96}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-white font-medium">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-[#808080] text-xs">{date}</p>
          <Bookmark className="text-primary-foreground w-5 h-5" stroke="#c3cc5a" />
        </div>
      </div>
    </div>
  )
}
