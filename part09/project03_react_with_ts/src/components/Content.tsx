import { assertNever } from "../typing/utils";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseDescript extends CoursePartBase {
    description: string;
}

const coursePartBasicKind = "basic";
interface CoursePartBasic extends CoursePartBaseDescript {
    kind: typeof coursePartBasicKind
}

const coursePartBackgroundKind = "background"
interface CoursePartBackground extends CoursePartBaseDescript {
    backgroundMaterial: string;
    kind: typeof coursePartBackgroundKind
}

const coursePartGroupKind = "group"
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: typeof coursePartGroupKind
}

const CoursePartRequirementsKind = "special"
interface CoursePartRequirements extends CoursePartBaseDescript {
    requirements: string[];
    kind: typeof CoursePartRequirementsKind
}


export type CoursePart = CoursePartBasic
| CoursePartGroup 
| CoursePartBackground
| CoursePartRequirements;

function Part({ coursePart }: { coursePart: CoursePart})
{

    const header = (
        <div style={{paddingTop: "1em"}}>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
        </div>
    )

    function Description({ desc }: { desc: CoursePartBaseDescript["description"]})
    {
        return (
            <i>{desc}</i>
        )
    }

    switch (coursePart.kind) {
        case (coursePartBasicKind): {
            return (
                <div>
                    {header}
                    <Description desc={coursePart.description} />
                </div>
            )
        }
        case (coursePartBackgroundKind): {
            return (
                <div>
                    {header}
                    <Description desc={coursePart.description} /><br></br>
                    {`Background material:`} <a href={coursePart.backgroundMaterial}>{coursePart.backgroundMaterial}</a>
                </div>
            )
        }
        case (coursePartGroupKind): {
            return (
                <div>
                    {header}
                    {`Group projects: ${coursePart.groupProjectCount}`}
                </div>
            )
        }
        case (CoursePartRequirementsKind): {
            return (
                <div>
                    {header}
                    <Description desc={coursePart.description} /><br></br>
                    {`Requirements: ${coursePart.requirements.join(", ")}`}
                </div>
            )
        }
        default: {
            assertNever(coursePart);
        }
    };
}

interface ContentProps {
    courseParts: CoursePart[]
}

export default function Content({ courseParts }: ContentProps)
{
    return (
        <>
            {courseParts.map(coursePart => <Part key={coursePart.name} coursePart={coursePart} />)}
        </>
    );
}