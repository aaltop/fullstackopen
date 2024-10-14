import { WeatherEnum, VisibilityEnum } from "./utils";

import { z } from "zod";

export type Visibility = z.infer<typeof VisibilityEnum>;
export type Weather = z.infer<typeof WeatherEnum>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
