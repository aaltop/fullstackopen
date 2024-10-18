import axios from "axios";
import { Patient, NewPatient } from "../typing/types";

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

export default {
  getAll, create, getById
};

