import BlogAddForm from "./BlogAddForm"

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"

describe("BlogAddForm element", () => {

    const testDetails = {
        title: "Title",
        author: "Author",
        url: "www.example.org"
    }

    function renderElement()
    {

        const submitAction = vi.fn(() => new Promise(() => true))

        render(
            <BlogAddForm
                submitAction={submitAction}
            />
        )

        return { submitAction }
    }

    function toggleVisible()
    {
        const button = screen.queryByText("New Blog")
            ?? screen.queryByText("Cancel")

        fireEvent.click(button)
    }

    test("submits correct values", () => {

        const { submitAction } = renderElement()
        toggleVisible()

        // get and set the input element values
        // ------------------------------------
        const inputLabels = ["Title", "Author", "Url"]
        const inputs = inputLabels.map(val => screen.getByLabelText(val))
        const inputVals = Object.values(testDetails)
        inputs.forEach((val, i) => {
            fireEvent.change(
                val,
                { target: { value: inputVals[i] } }
            )
        })
        // =======================================

        const submitButton = screen.getByText("Add Blog")
        fireEvent.submit(submitButton)
        const passedArguments = submitAction.mock.lastCall.slice(1)
        expect(passedArguments).toEqual(inputVals)
        console.log(passedArguments, inputVals)
    })
})