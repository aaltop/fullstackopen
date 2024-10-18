import axios, { AxiosError } from "axios";
import { Patient, NewPatient, NewEntryUnion, EntryUnion, ErrorResponse } from "../typing/types";

import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    baseUrl
  );

  return data;
};

const create = async (object: NewPatient) => {
  const { data } = await axios.post<Patient>(
    baseUrl,
    object
  );

  return data;
};

async function getById(id: string): Promise<Patient>
{
    const { data } = await axios.get<Patient>(
        `${baseUrl}/${id}`
    );

    return data;
}

async function addEntry(id: string, entry: NewEntryUnion): Promise<EntryUnion | ErrorResponse>
{
    try {
        const { data } = await axios.post(
            `${baseUrl}/${id}/entries`,
            entry
        );
    
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                return { error: "Network error."};
            }
            return error.response?.data;
        }
        return {
            error: "Error encountered."
        };
    }
}

export default {
  getAll, create, getById, addEntry
};

