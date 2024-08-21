import Blog from "./Blog"

import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"

describe("Blog element", () => {

    // NOT a full example currently (namely, user would have more)
    const testBlog = {
        user: {
            username: "username"
        },
        title: "Title",
        author: "Author",
        url: "www.example.org",
        likes: 0
    }

    const matchingUserData = {
        username: testBlog.username
    }

    test("renders only title and author by default", () => {

        const updateBlog = vi.fn()
        const deleteBlog = vi.fn()

        render(<Blog
            blog={testBlog}
            clientUserData={matchingUserData}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
        />)

        screen.getByText(testBlog.author, { exact: false })
        screen.getByText(testBlog.title, { exact: false })


        // might cause some issues for debugging?
        const expectedNull = [testBlog.url, testBlog.likes]
        expectedNull.forEach(elem => {
            expect(screen.queryByText(elem, { exact: false })).toBeNull()
        })
    })

})