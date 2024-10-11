import { NonSensitiveDiaryEntry } from './typing/types';
import diaryService from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';
import { NonSensitiveDiaryEntrySchema } from './typing/utils';

import AddDiaryEntryForm from './components/AddDiaryEntryForm';

import { useState, useEffect } from 'react';

function App() {

    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

    useEffect(() => {

        async function fetchData() {
            setDiaries(await diaryService.getAll());
        }

        fetchData();
    });

    return (
        <>
        <h2>New Entry</h2>
        <AddDiaryEntryForm onSubmit={async (ev, newEntry) => {
            ev.preventDefault()
            const {
                id,
                date,
                visibility,
                weather
            }: NonSensitiveDiaryEntry =  await diaryService.newEntry(newEntry);

            const entryToAdd = NonSensitiveDiaryEntrySchema.parse({
                id,
                date,
                visibility,
                weather
            })
            setDiaries(diaries.concat(entryToAdd));
        }} 
        />
        <h2>Diary Entries</h2>
        <DiaryEntries entries={diaries} />
        </>
    );
};

export default App
