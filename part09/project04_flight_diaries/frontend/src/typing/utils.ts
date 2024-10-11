import { Weather, Visibility } from './types';
import { z } from 'zod';

export const DiaryEntrySchema = z.object({
    id: z.number(),
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
})

export const NewEntrySchema = DiaryEntrySchema.omit({
    id: true
})

export const NonSensitiveDiaryEntrySchema = DiaryEntrySchema.omit({
    comment: true
})