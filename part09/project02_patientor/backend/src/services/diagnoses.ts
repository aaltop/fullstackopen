import data from "../data/diagnoses";
import { Diagnosis } from "../typing/types";


function getAll(): Diagnosis[]
{
    return data;
}


export default {
    getAll
};