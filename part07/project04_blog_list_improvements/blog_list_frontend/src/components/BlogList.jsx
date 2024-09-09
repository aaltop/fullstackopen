import blogService from "../services/blogs"

import Blog from "./Blog"

import { useQueryClient, useQuery } from "@tanstack/react-query"


export default function BlogList({ username })
{
    const queryClient = useQueryClient()

    const blogsQuery = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const blogs = await blogService.getAll()
            return blogs.toSorted((x, y) => y.likes - x.likes)
        }
    })


    return (
        <div>
            {blogsQuery.data?.map( (blog, blogIdx) =>
                <Blog
                    key={ blog.id }
                    blog={ blog }
                    clientUserData={{ username }}
                    deleteBlog={() => deleteBlog(blog, blogIdx)}
                    onLike={() => addBlogLike(blog, blogIdx)}
                />
            )}
        </div>
    )
}