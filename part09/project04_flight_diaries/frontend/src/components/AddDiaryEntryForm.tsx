import { NewEntrySchema } from "../typing/utils";
import { NewDiaryEntry } from "../typing/types";

import { useState } from "react"
import { ZodError } from "zod";


interface AddDiaryEntryFormProps {
    onSubmit: (
        event: React.SyntheticEvent,
        newEntry: NewDiaryEntry
    ) => Promise<void>
}

export default function AddDiaryEntryForm({ onSubmit }: AddDiaryEntryFormProps)
{
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState("");
    const [visibility, setVisibility] = useState("");
    const [comment, setComment] = useState("");

    function resetStates()
    {
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
    }

    async function submitForm(ev: React.SyntheticEvent)
    {
        try {
            const submittedEntry: NewDiaryEntry = NewEntrySchema.parse({
                date,
                weather,
                visibility,
                comment
            });
    
            await onSubmit(ev, submittedEntry);
            resetStates();
        } catch (error) {
            ev.preventDefault()
            if (error instanceof ZodError) {
                console.log("Whoopsie Daisy!")
                const errorMessages: string[] = error.errors.map(error => error.message);
                console.log(errorMessages);
            }
            throw new Error("Something went wrong.");
        }
    }

    return (
        <form onSubmit={submitForm}>
            <label>
                {"date: "}
                <input type="date" value={date} onChange={ev => setDate(ev.target.value)}></input>
            </label>
            <label>
                {"weather: "}
                <input type="text" value={weather} onChange={ev => setWeather(ev.target.value)}></input>
            </label>
            <label>
                {"visibility: "}
                <input type="text" value={visibility} onChange={ev => setVisibility(ev.target.value)}></input>
            </label>
            <label>
                {"comment: "}
                <input type="text" value={comment} onChange={ev => setComment(ev.target.value)}></input>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}