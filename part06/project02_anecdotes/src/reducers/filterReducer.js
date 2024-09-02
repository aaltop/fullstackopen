
const initialState = ""

// Action creators
// ----------------
const route = "filter/"

const changeFilterAction = route+"changeFilter"
export function changeFilter(filter)
{
    return {
        type: changeFilterAction,
        payload: {
            filter
        }
    }
}

// ===================


export default function reducer(state = initialState, action)
{

    switch (action.type)
    {
        case changeFilterAction:
        {
            return action.payload.filter
        }

        default: return state
    }
}