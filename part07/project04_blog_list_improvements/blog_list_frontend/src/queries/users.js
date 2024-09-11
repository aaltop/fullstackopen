import userService from "../services/users"

const baseKey = ["users"]

function queryUsers() {
    return {
        queryKey: baseKey,
        queryFn: userService.getAll,
    }
}

const userQueries = {
    queryUsers,
}
export default userQueries
