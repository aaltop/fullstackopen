
const Header = ({ course }) => <h1>{course}</h1>


// Took my original implementation, which already worked
// more or less regardless of number of parts
function Total({course})
{
    const num_exer = course.parts.reduce(
        (accum, current) => accum + current.exercises,
        0
    )
    return <p>Number of exercises {num_exer}</p>
}

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

function Content({parts})
{

    function map_func(part)
    {
        return <Part key={part.id} part={part} />
    }
    return (
        <>
            {parts.map(map_func)}
        </>
    )
}

function Course({course})
{
    return (
        <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
        </>
    )
}

export default Course