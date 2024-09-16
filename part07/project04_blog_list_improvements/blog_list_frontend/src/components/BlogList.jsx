import blogsQueries from "../queries/blogs"

import { BlogListDiv } from "../style/div"
import { Link as BaseLink } from "../style/link"

import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"

const BlogBlock = styled(BaseLink)`
    outline-width: thin;
    outline-style: solid;
    outline-color: ${props => props.theme.blogOutline};
    margin: 10px;
    padding: 5px;
    width: fit-content;
    min-width: 100%;

    /* flex stuff */
    display: flex;
    justify-content: center;
    align-items: center;

    /* Link style */
    text-decoration-line: none;
    color: white;
    font-size: larger;

    &:hover {
        background-color: ${props =>
            props.theme.bkgSoftHighlight};
    }

    &:visited {
        color: #888;
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
