import { changeFilter } from "../reducers/filterReducer"

import { useDispatch, useSelector } from "react-redux"



export default function Filter()
{
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    return (
        <div>
            <label htmlFor="filter">filter</label>
            <input
                type="text"
                id="filter"
                value={filter}
                onChange={ev => dispatch(changeFilter(ev.target.value))}
            ></input>
        </div>
    )
}