'use client';

import { Image, useCallback, useState } from "@/lib/react-npm";
import { Search, Circle, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DateButton from "./date-button";
import MatchSection, { MatchSectionSkeleton } from "./match-section";
import { useFixturesQuery } from "@/services/api/queries/home.query";
import { formatDate, getDayOfWeek, getRelativeDay } from "@/utils/dateHelpers";
import { useNuqsQueryState, parseAsString, parseAsIsoDate, debounce } from "@/lib/npm";

export default function LiveMatchDashboard() {
  const [date, setDate] = useNuqsQueryState('date', parseAsIsoDate.withDefault(new Date()));
  const [search, setSearch] = useNuqsQueryState('search', parseAsString.withDefault(''));
  const [debounceSearch, setDbounceSearch] = useState(search)

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDbounceSearch(value);
    }, 500)
    , []);


  const { data: fixturesData, isLoading } = useFixturesQuery({
    date: date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    search: debounceSearch,
  });

  const generateDateRange = (currentDate: Date | undefined) => {

    if (!currentDate) currentDate = new Date();

    const result = [];

    // Create a Date object from the current date to avoid mutating the state directly
    const baseDate = new Date(currentDate);

    // 2 days before and 3 days after
    for (let i = -2; i <= 2; i++) {
      const tempDate = new Date(baseDate);
      tempDate.setDate(baseDate.getDate() + i);
      const displayDate = formatDate(tempDate); // Format date as "DD MMM"
      const day = getDayOfWeek(tempDate); // Get the day of the week
      const relativeDay = getRelativeDay(tempDate, new Date()); // Get "Today", "Yesterday", etc.

      result.push({
        value: tempDate,
        day: day,
        date: displayDate,
        relativeDay: relativeDay,
      });
    }

    return result;
  };

  // Generate the date range for the selected date
  const dateRange = generateDateRange(date);
  const liveMatchCount = fixturesData?.reduce((acc, league) => {
    return acc + league.matches.filter((match) => match.isLive).length;
  }, 0) || 0;

  return (
    <div className="flex flex-col flex-1 gap-6">
      <div className="relative w-full h-[277px] rounded-[20px] overflow-hidden">
        <Image src={'/images/Banner.png'} alt="banner image" width={730} height={277} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 h-[calc(100%-277px-24px)] ">

        <div className="w-full bg-sidebar rounded-3xl shadow-xl p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row  md:items-center  gap-3 pb-6">

            {/* Live  */}
            <div className="flex items-center justify-center gap-2 md:gap-0 md:justify-around w-full md:w-[82px] rounded-[10px] bg-[#2c2c2c] p-1">
              <Circle className={`w-3 h-3 ${!!liveMatchCount ? 'fill-primary-foreground text-primary-foreground' : 'fill-gray-500 text-gray-500'}`} />
              <span className={`ml-2 font-medium ${!!liveMatchCount ? 'text-primary-foreground' : 'text-gray-500'}`}>Live</span>
              <span className="text-white opacity-80">({liveMatchCount})</span>
            </div>

            {/* search */}
            <div className="relative flex-1 mx-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]">
                <Search className="w-5 h-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Search For Matches"
                className="w-full bg-[#2c2c2c] text-[#ffffff] rounded-[10px] py-2 px-10 focus:outline-none"
                value={search}
                onChange={({ target }) => {
                  setSearch(target.value);
                  debouncedSearch(target.value);
                }}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center justify-between gap-2 bg-[#2c2c2c] rounded-[10px] py-2 px-4 cursor-pointer">
              <span className="text-white">All Matches</span>
              <ChevronDown />
            </div>

          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between pb-6">

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 flex-1">
              {dateRange.map((item) => (
                <DateButton
                  key={item.value.toString()}
                  day={item.relativeDay}
                  date={item.date}
                  isActive={item.value.toString() === date?.toString()}
                  onClick={() => setDate(item.value)}
                />
              ))}

              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex py-2 px-4 items-center gap-2 border border-primary-foreground text-white rounded-[10px]">
                    <CalendarIcon className="w-5 h-5 text-primary-foreground" />
                    <span className="text-left text-[12px]">View Calendrer</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (selectedDate) setDate(selectedDate);
                    }}
                    className="cursor-pointer"
                  />
                </PopoverContent>
              </Popover>
            </div>

          </div>

          {/* Match Sections */}
          <div className="!space-y-6 overflow-hidden lg:overflow-y-auto h-[calc(100%-64px-80px)]">

            {isLoading
              ? <MatchSectionSkeleton />
              : !fixturesData?.length ? <NoDataFound /> : fixturesData?.map((League) => (
                <MatchSection
                  key={League.id}
                  id={League.id}
                  league={League.league}
                  leagueLogo={League.leagueLogo}
                  state={League.state}
                  stage={League.stage}
                  venue={League.venue}
                  matches={League.matches}
                />
              ))
            }

          </div>
        </div>

      </div>
    </div>
  )
}

const NoDataFound = () => {
  return (
    <div className="flex justify-center items-center w-full text-white p-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">No Data Found</h2>
        <p className="mt-2 text-gray-400">We couldn&apos;t find any matches. Please try again later.</p>
      </div>
    </div>
  );
}