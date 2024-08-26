import deepFreeze from "deep-freeze"
import counterReducer from "./reducer"

import { describe, test, expect } from "vitest"

describe("unicafe reducer", () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    test("should return a proper initial state when called with undefined state", () => {
        const state = {}
        const action = {
            type: "DO_NOTHING"
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    function testIncrement(actionType, initialState, expectedNewState)
    {
        const action = {
            type: actionType
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual(expectedNewState)
    }

    test("good is incremented", () => {
        const expected = { ...initialState, good: initialState.good + 1 }
        testIncrement("GOOD", initialState, expected)
    })

    test("ok is incremented", () => {
        const expected = { ...initialState, ok: initialState.ok + 1 }
        testIncrement("OK", initialState, expected)
    })

    test("bad is incremented", () => {
        const expected = { ...initialState, bad: initialState.bad + 1 }
        testIncrement("BAD", initialState, expected)
    })

    test("zero resets state", () => {
        let state = initialState

        // Add some state first so it's not the initial state
        // ---------------------------------------------------
        const ops = ["GOOD", "BAD", "OK"]
        ops.forEach(op => {
            const action = { type: op }
            state = counterReducer(state, action)
        })

        const expected = Object.fromEntries(
            Object.entries(initialState).map(([key, value]) => [key, value + 1])
        )
        expect(state).toEqual(expected)
        // ====================================================

        deepFreeze(state)
        expect(
            counterReducer(state, { type: "ZERO" })
        ).toEqual(initialState)
    })
})