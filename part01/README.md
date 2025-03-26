# Contents

This part of the course deals with basic Javascript and React concepts.

## Main technologies introduced

### [Node.js](https://nodejs.org/en)

A Javascript runtime environment allowing Javascript to be run outside the browser enviroment natively, facilitating Javascript's use as a server-side and scripting language. It uses the [V8 engine](https://v8.dev/) which can be embedded in C++. Consequently, Node is largely written in C++, allowing decent performance.

Node comes with npm, the node package manager. It is most often used to manage installed libraries and takes care of solving dependencies and checking for vulnerability warnings of installed libraries. Largely automated, it does not by default require much configuration from the user. Some alternatives include "performant npm" [pnpm](https://pnpm.io/), possibly faster and more disk-space efficient, and [yarn](https://yarnpkg.com/), which emphasises stability in large codebases.

### [React](https://react.dev/)

One of the possible libraries for modern front end interface development. Combines HTML and Javascript into one, fast language* that's easy to use. Updates to components are based on updates to state, allowing for responsiveness when using React designs properly. Many additional features are available through other libraries.

*More accurately, the React "language" gets transpiled into Javascript code that additionally creates and manipulates HTML as defined by the React code.

### [Vite](https://vite.dev/)

A build tool for the front end. Allows setting up a project easily based on a template, has hot module replacement (update-as-you-code), and allows easily build static assets for serving in production, amongst other features.
