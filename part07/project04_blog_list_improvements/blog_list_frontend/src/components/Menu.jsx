import { Link } from "../style/link"

export default function Menu() {
    const padding = {
        paddingRight: 5,
    }

    return (
        <nav>
            <div>
                <Link to="/" style={padding}>
                    Blogs
                </Link>
            </div>
            <div>
                <Link to="/users" style={padding}>
                    Users
                </Link>
            </div>
        </nav>
    )
}
