import { z } from 'zod';

export const WeatherEnum = z.enum([
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy"
]);

export const VisibilityEnum = z.enum([
    "great",
    "good",
    "ok",
    "poor"
]);

export const DiaryEntrySchema = z.object({
    id: z.number(),
    weather: WeatherEnum,
    visibility: VisibilityEnum,
    date: z.string().date(),
    comment: z.string().optional()
})

export const NewEntrySchema = DiaryEntrySchema.omit({
    id: true
})

export const NonSensitiveDiaryEntrySchema = DiaryEntrySchema.omit({
    comment: true
})