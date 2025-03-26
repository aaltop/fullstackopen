# Contents

This part of the course focuses on developing backend functionalities
and deploying a server to production that also serves the static frontend.

A non-exhaustive list of covered concepts:
- Express
    - request and response objects
    - route parameters
    - middleware
    - CORS to allow frontend access
    - static content serving
- Vite
    - proxying
- MongoDB Atlas
    - configuration
- mongoose
    - schemas
        - validation
    - models
        - creating and querying

## Main technologies introduced

### [Express](https://expressjs.com/)

HTTP server library.

### [nodemon](https://nodemon.io/)

Mainly used for restarting the server when any changes to code are noticed by nodemon; naturally used only in a development setting. Similar functionality is also available through [node's --watch flag](https://nodejs.org/api/cli.html#--watch), which the course has changed to using.

### [MongoDB](https://www.mongodb.com/)

NoSQL document database.

### [mongoose](https://mongoosejs.com/)

A high-level API used for interacting with a MongoDB database.

### [dotenv](https://github.com/motdotla/dotenv)

Easy way of defining environment variables for use with node.
Potential replacement: [dotenvx](https://github.com/dotenvx/dotenvx).

### [ESLint](https://eslint.org/)

Linting.
