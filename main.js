const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;
const path = require("path");

let mainWindow;
let nodeProcess;

function createWindow() {
  console.log("Starting app");
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile(`dist/ledger/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.on("close", () => {
    console.log("close");
  });

  mainWindow.on("closed", () => {
    console.log("closed");
    mainWindow = null;
    nodeProcess.kill("SIGINT");
    app.quit();
  });
}

async function startServer() {
  console.log("Starting server");
  const { spawn } = require("child_process");
  // For electron-packager change cwd in spawn to app.getAppPath() and
  // uncomment the app require below
  //app = require('electron').remote.app,
  try {
    nodeProcess = spawn(
      path.join(__dirname, "node_modules/node/bin/node"),
      [path.join(__dirname, "ledger-server/dist/main")],
      {
        stdio: ["pipe", "pipe", "pipe", "ipc"],
        cwd: process.cwd(),
      }
    );

    nodeProcess.stdout.on("data", function (data) {
      console.log("Server:: " + data);
    });

    nodeProcess.on("message", (message) => {
      if (message.type === "SERVER_STARTED" && !mainWindow) {
        createWindow();
        // process.env.BASE_URL = message.data.baseUrl;
      }
    });
  } catch (ex) {
    console.log(ex);
  }
}

app.on("ready", async function () {
  console.log("ready");
  startServer();
});

app.on("browser-window-created", function (e, window) {
  console.log("browser-window-created");
  window.setMenu(null);
});

app.on("window-all-closed", function () {
  console.log("window-all-close");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  console.log("activate");
});
