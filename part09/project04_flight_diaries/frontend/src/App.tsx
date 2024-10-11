import { NonSensitiveDiaryEntry } from './typing/types';
import diaryService from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';

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
        <h2>Diary Entries</h2>
        <DiaryEntries entries={diaries} />
        </>
    );
};

export default App
