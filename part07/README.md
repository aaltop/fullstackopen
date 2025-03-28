# Contents

This part of the course deals with routing on the frontend, useful
for single-page applications, more powerful ways of styling, and
using webpack instead of Vite for building the application.

A non-exhaustive list of covered concepts:
- React Router
    - routes
    - links
    - route parameters
    - useNavigate
- Javascript
    - tagged template literals

## Main technologies introduced

### [React Router](https://reactrouter.com/)

Allows imitating page changes based on url routes on a single-page
app. [Tanstack Router](https://tanstack.com/router/latest) might be a good alternative, belonging to the same group of libraries as Tanstack (React) Query. Tanstack has a number of other useful libraries as well.

### [React Bootstrap](https://react-bootstrap.github.io/)

Takes [Bootstrap](https://getbootstrap.com/) and makes it work in a React-friendly way with
pre-styled React components, amongst other features.

### [Material UI](https://mui.com/)

"[C]omponent library that implements Google's Material Design." Also has built-in React-compatible components.

[Material Design](https://material.io/)

### [styled-components](https://styled-components.com/)

A hands-on approach to styling in a React way. Uses tagged template literals to define styling for components using CSS syntax directly in Javascript.

### [Webpack](https://webpack.js.org/)

Older method for building Javascript frontend projects (along with other features presumably, but I've not dived too deep into it). Other, more modern tools like Vite are likely more commonly used, as Webpack requires potentially much more configuration to make building work. [esbuild](https://esbuild.github.io/) might be a modern option compared to Webpack.

### [Prettier](https://prettier.io/)

Opinionated code formatting.
