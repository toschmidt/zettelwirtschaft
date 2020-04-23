# Yet Another Monorepo Example

Monorepo template for a fullstack TypeScript application based on React and Express.
 
## Usage

`yarn bootstrap` installs all dependency and links the packages.

### Production

`yarn build` transpiles all TypeScript files to JavaScript and bundles the frontend. The generated files are deleted using `yarn clean`.

- `yarn backend:start` starts the backend express serve and serves the rest endpoints and frontend on `localhost:8000`.

### Development

The setup supports both reloading code and debugging using **tsc**, **nodemon** and **webpack-dev-server**.

`yarn watch` transpiles all TypeScript files to JavaScript and watches for changes in the source code.

- `backend:serve` serves the rest endpoints on `localhost:8000` and restart the backend on file change.
- `frontend:serve` serves the frontend using the webpack-dev-server on `localhost:8000` and reloads the application on file change using hot module replacement.

## Tools

- **[Lerna](https://github.com/lerna/lerna) & [yarn](https://github.com/yarnpkg/yarn)** links packages together and shares dependencies between them using yarn workspaces.
- **[TypeScript](https://github.com/Microsoft/TypeScript)** transpiles TypeScript sources to JavaScript.
- **[nodemon](https://github.com/remy/nodemon)** serves a node application and automatically restarts it when source files change.
- **[webpack](https://github.com/webpack/webpack)** bundles JavaScript, HTML and CSS files for the web.
- **[webpack-dev-server](https://github.com/webpack/webpack-dev-server)** serves a webpack application and refreshes the browser on change.
- **[eslint](https://github.com/eslint/eslint)** reports common mistakes and tries to fix them using predefined rules.
- **[prettier](https://github.com/prettier/prettier)** formats code.

## Technologies

### Backend

- **[Express](https://github.com/expressjs/express)** web framework for serving the backend.
- **[Ts.ED](https://github.com/TypedProject/tsed)** framework on top of express providing decorators for REST endpoints, dependency injection, swagger and mongodb.

### Frontend

- **[React](https://github.com/facebook/react)** for building frontend user interfaces.
- **[Restful-React](https://github.com/contiamo/restful-react)** provides react hooks for interacting with backends exposing REST endpoints.
