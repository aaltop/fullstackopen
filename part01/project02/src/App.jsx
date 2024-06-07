import { useState } from 'react'

function sum(arr)
{
    return arr.reduce(
        (total, current) => total+current,
        0
    )
}

function mean(arr)
{
    return sum(arr)/arr.length
}

function Button({onClick, text})
{
    return (
        <button onClick={onClick}>{text}</button>
    )
}

function StatisticLine({value, text})
{
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

function Statistics({good, bad, neutral})
{

    function reviewCounts()
    {
        return [good, bad, neutral]
    }

    function totalReviews()
    {
        return good+neutral+bad
    }

    // no statistics printed if no reviews
    if (0 === totalReviews())
    {
        return (
            <>
            <h1>Statistics</h1>
            <p>No feedback given</p>
            </>
        )
    }

    // good is +1, neutral 0, and bad -1
    function totalScore()
    {
        return good - bad
    }

    function averageScore()
    {
        return totalScore()/totalReviews()
    }


    return (
        <>
        <h1>Statistics</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                    <StatisticLine value={good} text="good"/>
                    <StatisticLine value={neutral} text="neutral"/>
                    <StatisticLine value={bad} text="bad"/>
                    <StatisticLine value={totalReviews()} text="total"/>
                    <StatisticLine value={averageScore()} text="average"/>
                    <StatisticLine value={good/totalReviews()*100 + "%"} text="positive"/>
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    function incrementGood()
    {
        setGood(good+1)
    }

    function incrementNeutral()
    {
        setNeutral(neutral+1)
    }

    function incrementBad()
    {
        setBad(bad+1)
    }

    return (
    <div>
        <h1>Give feedback</h1>
            <Button onClick={incrementGood} text="good"/>
            <Button onClick={incrementNeutral} text="neutral"/>
            <Button onClick={incrementBad} text="bad"/>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
    )
}

export default App
