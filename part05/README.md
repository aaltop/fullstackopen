# Contents

This part of the course covers frontend and end-to-end testing
and user authentication on the frontend.

A non-exhaustive list of covered concepts:
- javascript
    - local storage
    - keeping cross-site scripting in mind
- react
    - props.children
    - references
        - pass useRef variable to ref of component
        - use forwardRef to receive passed ref
            - to be deprecated in favour of passing ref directly: https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop.
        - use useImperativeHandle to expose methods of component that can be used through ref in parent component.


## Main technologies introduced

### [vitest](https://vitest.dev/)

Testing framework. Better for use with Vite compared to Jest, while being largely interface-compatible with Jest.

### [jsdom](https://github.com/jsdom/jsdom)

Emulates web browser functionalities to allow frontend tests (amongst other things) to be performed in Node environments.

### [react-testing-library](https://github.com/testing-library/react-testing-library)

For testing React code. Allows rendering React components and interacting with the rendered content, allowing emulation of GUI interaction.

### [user-event](https://github.com/testing-library/user-event)

A "companion library" for react-testing-library, adds more powerful user interactions for testing compared to the default fireEvent method.


### [jest-dom](https://github.com/testing-library/jest-dom)

Adds various frontend testing assertions, making writing said tests more straightforward.

### [Playwright](https://playwright.dev/)

Testing framework for end-to-end tests.
