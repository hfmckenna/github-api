# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Installation

```shell
# Install node modules
npm i
# Install types derived from API spec for local development
# TODO: Install via CI pipeline for automated deployments
npx openapi-typescript ./models/GitHubOpenApi.json -o ./src/github.d.ts
```

## Running

Ensure you've added a valid access token to the environment files, personal access tokens with Read access to metadata
for searching public GitHub repos among other public data.

There is an example file but all production secrets should be ignored.

```shell
VITE_GITHUB_TOKEN=my_token_here
```

After that a convenience command `npm run start` can run all steps to ensure the repo is sound. Then it will start a Dev
Server so you use it.

### Dev Server

Use `npm run dev` to run the Vite dev server for local development.