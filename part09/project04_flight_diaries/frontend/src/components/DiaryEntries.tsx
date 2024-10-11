import { NonSensitiveDiaryEntry } from "../typing/types";




function DiaryEntry({ entry }: { entry: NonSensitiveDiaryEntry})
{
    return (
        <tr>
            <td>{entry.date}</td>
            <td>{entry.visibility}</td>
            <td>{entry.weather}</td>
        </tr>
    );
}


export default function DiaryEntries({ entries }: { entries: NonSensitiveDiaryEntry[]})
{
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Visibility</th>
                    <th>Weather</th>
                </tr>
            </thead>
            <tbody>
                {entries.map(entry => <DiaryEntry key={entry.id} entry={entry} />)}
            </tbody>
        </table>
    )
}