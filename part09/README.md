# Contents

This part of the course deals with using Typescript which effectively
adds strong typing to Javascript, being ultimately transpiled to Javascript
at compile time.

A non-exhaustive list of covered concepts:
- Typescript
    - obviously a bunch of stuff often seen in other typed languages
    - config settings
        - especially noImplicitAny is useful
    - type narrowing
    - utility types
    - vite: react-ts template
    - [React cheatsheet](https://react-typescript-cheatsheet.netlify.app/)


## Main technologies introduced

### [Typescript](https://www.typescriptlang.org/)

The aforementioned.


### [ts-node](https://github.com/TypeStrong/ts-node)

Allows directly executing Typescript scripts without a separate
explicit compilation step. Also have Typescript REPL support through
JIT compilation.

### [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

Not all libraries have support for Typescript, being written
in Javascript and therefore not having complete typing. This repository
has typing for numerous libraries, allowing the easier inclusion of
the corresponding libraries into a Typescript project.

### [ts-node-dev](https://github.com/wclr/ts-node-dev)

Allows nice auto-reloading of Typescript code.

### [Zod](https://zod.dev/)

One option to simplify type narrowing/validation. Has some nice
interoperability with Typescript.


## Musings

### Zod

Zod has [type inference](https://zod.dev/?id=type-inference) which
allows Typescript types to basically be created based on schemas
defined in Zod. Therefore, if using Zod, it is possible to define
schemas first and very simply create the corresponding type from there,
while the opposite (defining a type in Typescript then inferring the
Zod schema based on that) is not possible. As a result, it may be
preferrable to do the former to limit the amount of repeated code and
possible discrepancies between the schemas and types.
On the other hand, This sets a stronger dependence on Zod such that if Zod needed
to be dropped, types would possibly have to be defined explicitly on top of
presumably needing to rewrite any validation code.
