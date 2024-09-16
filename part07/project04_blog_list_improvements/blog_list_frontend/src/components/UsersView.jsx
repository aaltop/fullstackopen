import userQueries from "../queries/users"

import { useQuery } from "@tanstack/react-query"
import { Link } from "../style/link"

export default function UsersView() {
    const users = useQuery(userQueries.queryUsers()).data

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => {
                        return (
                            <tr key={user.username}>
                                <td>
                                    <Link
                                        to={user.id.toString()}
                                    >
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
