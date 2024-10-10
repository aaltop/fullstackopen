
interface HeaderProps {
    content: string
}

export default function Header({ content }: HeaderProps)
{
    return (
        <h1>{content}</h1>
    );
}