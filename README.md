# Ledger

Electron app with Angular as Frontend, Nest as server and SQLite as DB.
This will start local node server on startup of app.

## Running locally
npm i
npm run electron

## Build
Frontend:
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Backend:
Server is in ledger-server
Navigate to ledger-server and
Run `npm i` and `nest build`

## Pacakging App
In root folder run `npm run pacakge`.
This will create app for your platform.
Please check electron-packager npm pacakge for additional options.

