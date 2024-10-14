
interface RadioChoiceProps<T extends string> {
    choices: T[],
    name: string
}


export default function RadioChoice<T extends string>({ choices, name }: RadioChoiceProps<T>)
{

    return (
        <>
        {choices.map(ch => {
            return <label key={ch}>
                {` ${ch}:`}
                <input type="radio" name={name} value={ch} required/>
            </label>
        })}
        </>
    )
}