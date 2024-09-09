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
        const deleteBlog = vi.fn()
        const onLike = vi.fn()

        render(<Blog
            blog={testBlog}
            clientUserData={matchingUserData}
            deleteBlog={deleteBlog}
            onLike={onLike}
        />)

        return { deleteBlog, onLike }
    }

    function toggleVerbose()
    {
        const button = screen.queryByText("Show") ?? screen.queryByText("Hide")
        fireEvent.click(button)
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
        toggleVerbose()

        const shownInVerbose = shownByDefault.concat(notShownByDefault)
        shownInVerbose.forEach(val => {
            screen.getByText(val, { exact: false })
        })

    })

    test("accepts likes clicks correctly", () => {

        const { onLike } = renderBlog()
        toggleVerbose()

        const likesButton = screen.getByText("like")
        fireEvent.click(likesButton)
        expect(onLike.mock.calls).toHaveLength(1)

        fireEvent.click(likesButton)
        expect(onLike.mock.calls).toHaveLength(2)
    })

})