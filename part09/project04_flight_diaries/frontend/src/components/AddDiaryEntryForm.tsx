import { NewEntrySchema, VisibilityEnum, WeatherEnum } from "../typing/utils";
import { NewDiaryEntry } from "../typing/types";
import { NotificationContext } from "../contexts";
import RadioChoice from "./RadioChoice";

import { useContext, useState } from "react"
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
    const [comment, setComment] = useState("");

    const [_notifications, notificationMethods] = useContext(NotificationContext);

    function resetStates()
    {
        setDate("");
        setComment("");
    }

    async function submitForm(ev: React.FormEvent<HTMLFormElement>)
    {
        // interestingly, this is just directly in the typescript
        // docs, so I guess it's okay-ish?
        const target = ev.target as typeof ev.target & {
            elements: { visibility: RadioNodeList, weather: RadioNodeList}
        }
        const visibility = target.elements.visibility.value
        const weather = target.elements.weather.value
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
                const errorMessages: string[] = error.errors.map(error => error.message);
                notificationMethods.setNotifications(errorMessages);
                return;
            }
            throw new Error("Something went wrong.");
        }
    }

    const labelStyle = {display: "block"}

    return (
        <form onSubmit={submitForm}>
            <label style={labelStyle}>
                {"date: "}
                <input type="date" value={date} onChange={ev => setDate(ev.target.value)} required></input>
            </label>
            <label style={labelStyle}>
                {"weather: "}
                <RadioChoice name="weather" choices={WeatherEnum.options} />
            </label>
            <label style={labelStyle}>
                {"visibility: "}
                <RadioChoice name="visibility" choices={VisibilityEnum.options} />
            </label>
            <label style={labelStyle}>
                {"comment: "}
                <input type="text" value={comment} onChange={ev => setComment(ev.target.value)}></input>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}