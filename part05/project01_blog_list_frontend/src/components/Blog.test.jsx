import Blog from "./Blog"

import { render, screen, fireEvent } from "@testing-library/react"
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

    const shownByDefault = [
        testBlog.title,
        testBlog.author
    ]

    const notShownByDefault = [
        testBlog.url,
        testBlog.likes
    ]

    const matchingUserData = {
        username: testBlog.username
    }

    function renderBlog()
    {
        const updateBlog = vi.fn()
        const deleteBlog = vi.fn()

        render(<Blog
            blog={testBlog}
            clientUserData={matchingUserData}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
        />)
    }

    test("renders only title and author by default", () => {

        renderBlog()

        shownByDefault.forEach(val => {
            screen.getByText(val, { exact: false })
        })

        notShownByDefault.forEach(val => {
            expect(screen.queryByText(val, { exact: false })).toBeNull()
        })
    })

    test("renders expected values after 'Show' click", () => {

        renderBlog()

        const button = screen.getByText("Show")
        fireEvent.click(button)

        const shownInVerbose = shownByDefault.concat(notShownByDefault)
        shownInVerbose.forEach(val => {
            screen.getByText(val, { exact: false })
        })

    })

})