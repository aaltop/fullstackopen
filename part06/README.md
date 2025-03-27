# Contents

This part of the course deals with more sophisticated state management
in React.

A non-exhaustive list of covered concepts:
- Redux
    - store
    - actions, action creators
    - reducers
        - must be pure
- React Redux
    - providers are used to pass the store to components
    - useDispatch
        - pass actions to change store state
    - useSelector
        - select specific values from store
    - combineReducers
- Javascript
    - native export as default
- React Toolkit
    - createSlice
        - Simplifies code compared to defining action creators and reducer
- Tanstack Query
    - queries
    - mutations
    - managing cache

## Main technologies introduced

### [Redux](https://redux.js.org/)

One option for a state management library.

### [Redux Toolkit](https://redux-toolkit.js.org/)

The preferred way of actually doing Redux, some QoL over Redux.

### [React Redux](https://react-redux.js.org/)

React bindings for Redux, making Redux integrate with React.

### [Tanstack Query](https://tanstack.com/query/latest)

Cleaner state management and communication with backend. Can work along-side Redux or similar libraries as a *server-side* state manager, taking care of communication with the server and caching server data on the frontend. Redux can then be used solely for taking care of *client-side* state management, if at all: React has very similar functionalities built into it, namely the useReducer and createContext. These can be used to create a very similar setup to Redux, at least when it comes to the basics.
