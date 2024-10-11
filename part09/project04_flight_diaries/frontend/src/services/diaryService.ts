import { NonSensitiveDiaryEntry } from "../typing/types";
import { relativeUrl } from "./utils";
import typingUtilities from "../typing/utils";

import axios from "axios";

const routeUrl = "/api/diaries";

async function getAll(): Promise<NonSensitiveDiaryEntry[]>
{
    const response = await axios.get<unknown[]>(relativeUrl(routeUrl));
    return response.data.map((datum: unknown) => typingUtilities.toNonSensitiveDiaryEntry(datum));
}


export default {
    getAll
};