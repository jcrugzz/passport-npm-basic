# passport-npm-basic

A simple `basic-auth` handler for `passport-npm`.

## Options

- `options`
-   `options.auth` - Object containing `user` and `password` properties to
    compare for basic auth.
-   `options.lookup` - a function that accepts an object with `name` and
    `password` properties and a continuation function as parameters
    and should return an error or false as a result to the continuation function if the given
    `name` and `password` are not valid, otherwise the result should be set
    explicitly to true


