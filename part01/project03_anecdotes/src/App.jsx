import { useState } from 'react'

const App = () => {
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]

// it's simpler, sure, but more annoying when a new anecdote is
// added
const initial_votes = Array(anecdotes.length).fill(0)
const [votes, set_votes] = useState(initial_votes)

const [selected, setSelected] = useState(0)

function change_anecdote(idx)
{
    // ensure correct range for the index
    if (0 > idx){ idx = 0 }
    else if (idx > anecdotes.length){ idx = anecdotes.length-1 }
    setSelected(idx)
}

// returns random integer in [0, upper-1]
function random_integer(upper)
{
    return Math.ceil(upper*Math.random())-1
}

function random_anecdote()
{
    change_anecdote(random_integer(anecdotes.length))
}


function vote_anecdote(current_votes)
{
    const temp_votes = [...current_votes]
    temp_votes[selected] += 1
    console.log("Votes:", temp_votes)
    return temp_votes
}

// supposedly not the best, but I guess it'll work for now
function argmax(arr)
{
    return arr.indexOf(Math.max(...arr))
}

return (
    <>
    <h1>Random anecdote</h1>
    <div>
    {anecdotes[selected]}
    </div>
    <div>
        <button onClick={random_anecdote}>Random Anecdote</button>
        {/* Testing updater function for the lols */}
        <button onClick={() => set_votes(vote_anecdote)}>Vote Anecdote</button>
    </div>
    <h1>Anecdote with most votes</h1>
    <div>
    {anecdotes[argmax(votes)]}
    </div>
    </>
)
}

export default App
