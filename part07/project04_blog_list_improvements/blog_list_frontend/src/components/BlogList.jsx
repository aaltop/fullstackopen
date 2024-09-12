import blogsQueries from "../queries/blogs"

import { lightMode as color } from "../style/color"
import { BlogListDiv } from "../style/div"
import { Link as BaseLink } from "../style/link"

import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"

const BlogBlock = styled(BaseLink)`
    outline-width: thin;
    outline-style: solid;
    outline-color: ${color.blogOutline};
    width: fit-content;
    margin: 10px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-items: end;

    /* Link style */
    text-decoration-line: none;

    &:hover {
        background-color: #fbff87;
    }
`

export default function BlogList() {
    const blogsQuery = useQuery(blogsQueries.queryBlogs())

    const blogs = blogsQuery.data

    return (
        <BlogListDiv>
            {blogs?.map((blog, blogIdx) => (
                <BlogBlock
                    to={`/blogs/${blog.id}`}
                    key={blog.id}
                >
                    {blog.title}
                </BlogBlock>
            ))}
        </BlogListDiv>
    )
}
