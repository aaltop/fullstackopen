import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../typing/types";

import axios from "axios";

const baseUrl = `${apiBaseUrl}/diagnoses`;


async function getAll()
{
    const { data } = await axios.get<Diagnosis[]>(
        baseUrl
    );

    return data;
}

export default {
    getAll
};