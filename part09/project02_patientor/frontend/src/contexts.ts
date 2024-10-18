import { createContext } from "react";
import { Diagnosis } from "./typing/types";



export const DiagnosesContext = createContext<Diagnosis[]>([]);