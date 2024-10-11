import { NonSensitiveDiaryEntry } from './typing/types';
import diaryService from './services/diaryService';

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
        {diaries.map(diary => <div key={diary.id}>{diary.date}</div>)}
        </>
    );
};

export default App
