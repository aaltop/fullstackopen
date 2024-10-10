
interface CoursePart {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    courseParts: CoursePart[]
}

export default function Content({ courseParts }: ContentProps)
{
    return (
        <>
            {courseParts.map(coursePart => {
                return (
                    <p key={coursePart.name}>
                        {coursePart.name} {coursePart.exerciseCount}
                    </p>
                )
            })}
        </>
    );
}