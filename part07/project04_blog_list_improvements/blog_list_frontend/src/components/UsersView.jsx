import userService from "../services/users"

import { useQuery } from "@tanstack/react-query"

export default function UsersView() {
    const users = useQuery({
        queryKey: ["users"],
        queryFn: userService.getAll,
    }).data

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
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
