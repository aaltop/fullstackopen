import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../typing/types";
import { relativeUrl } from "./utils";
import { DiaryEntrySchema, NonSensitiveDiaryEntrySchema } from "../typing/utils";

import axios, { AxiosResponse } from "axios";

const routeUrl = "/api/diaries";

async function getAll(): Promise<NonSensitiveDiaryEntry[]>
{
    const response = await axios.get<unknown[]>(relativeUrl(routeUrl));
    return response.data.map((datum: unknown) => NonSensitiveDiaryEntrySchema.parse(datum));
}

async function newEntry(entry: NewDiaryEntry): Promise<DiaryEntry>
{
    const response = await axios.post<NewDiaryEntry, AxiosResponse<DiaryEntry>>(relativeUrl(routeUrl), entry);
    return DiaryEntrySchema.parse(response.data);
}

export default {
    getAll,
    newEntry
};