import { FixturesResponse, LeagueType } from "@/types/fixtures";
import axiosInstance from "./axiosClient";



export const fetchFixturesByDate = async (date: string, search: string): Promise<LeagueType[]> => {
  try {
    const { data }: { data: FixturesResponse } = await axiosInstance.get(`/fixtures?date=${date}&search=${search}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    throw new Error("Failed to fetch fixtures");
  }
};