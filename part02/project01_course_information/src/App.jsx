import Course from "./Course"


const App = () => {
    const courses = [
        {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
            },
            // for testing reasons
            // {
            // name: 'Fundamentals of React',
            // exercises: 10,
            // id: 42
            // },
            {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
            },
            {
            name: 'State of a component',
            exercises: 14,
            id: 3
            },
            {
            name: 'Redux',
            exercises: 11,
            id: 4
            }
        ]
        }, 
        {
        name: 'Node.js',
        id: 2,
        parts: [
            {
            name: 'Routing',
            exercises: 3,
            id: 1
            },
            // for testing reasons
            // {
            // name: 'Routing',
            // exercises: 3,
            // id: 45
            // },
            {
            name: 'Middlewares',
            exercises: 7,
            id: 2
            }
        ]
        }
    ]

    function map_func(course)
    {
        return <Course key={course.id} course={course} />
    }

    return (
        <>
            {courses.map(map_func)}
        </>
    )
}


export default App
