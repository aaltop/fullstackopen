# Contents

This part of the course expands on Javascript and React concepts.

A non-exhaustive list of covered concepts:
- Javascript
    - functional programming (map, reduce etc.)
    - promise chaining (then, catch, etc.)
        - later, await/async is exclusively used due to being cleaner
- React
    - forms
    - collections (lists using .map)
    - effects: synchronising with services external to React
        - triggered after rendering, possibly as a response to a specific state change
    - customising using CSS and inline styles
        - later, more powerful methods are also introduced

## Main technologies introduced

### [json-server](https://github.com/typicode/json-server)

Useful for creating a simple development-time dummy backend for testing.
Data is saved in JSON format and a REST API automatically created based
on the data.

### [Axios](https://axios-http.com/)

Simple HTTP client. I think this mainly has some quality-of-life improvements over the
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API),
such as being able to pass data directly as an object in the body,
instead of needing to stringify it first like with fetch.
