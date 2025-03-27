# Contents

This part of the course covers backend testing and user
authentication.

A non-exhaustive list of covered concepts:
- express
    - routers
- node
    - built-in testing functionalities
        - after/before(-each), describe, test, assert
- javascript
    - async/await
- jsonwebtoken
    - using Auth Bearer headers to pass the token

## Main technologies introduced

### [cross-env](https://github.com/kentcdodds/cross-env)

Allows defining environment variables in a cross-platform compatible
way.

### [supertest](https://github.com/ladjs/supertest)

HTTP client for testing which adds assertions on top of
[superagent](https://github.com/ladjs/superagent).

### [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

Implements the password-hashing function, bcrypt. Requires
a number of dependencies and potentially requires building
from source, with different requirements per platform. The pure Javascript, no dependencies alternative
[bcryptjs](https://github.com/dcodeIO/bcrypt.js) is arguably
preferable.

### [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

For generating JSON web tokens usable for authentication.
