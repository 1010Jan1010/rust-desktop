// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, nativeImage, ipcMain, globalShortcut, Notification } = require("electron");
const path = require("path");
const RustPlus = require("@liamcottle/rustplus.js");
const Store = require("electron-store");
let rustplus;
const fs = require("fs");

const { fcmListen, fcmRegister } = require("../testChrome.js");

let tray, window;

function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    icon: __dirname + "/icon.ico",
    width: 420,
    height: 560,
    show: true,
    frame: true,
    fullscreenable: false,
    resizable: true,
    transparent: false,
    title: "Rust Desktop",
    autoHideMenuBar: true,
    alwaysOnTop: false,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.on("closed", () => (window = null));
  // load the index.html of the app.
  window.loadURL("http://localhost:3000");

  // Open DevTools
  window.webContents.openDevTools();
}

const createTray = () => {
  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "public", "logo192.png")));

  tray.setToolTip("Rust Desktop");
  tray.on("click", () => {
    window.isVisible() ? window.hide() : window.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createTray();

  createWindow();

  ipcMain.handle("updateStore", async (event, args) => {
    await store.set(`servers.${args.id}`, args);
  });

  ipcMain.handle("getServers", async (event, args) => {
    return store.get(`servers`);
  });

  ipcMain.handle("setupConnection", async (event, args) => {
    //console.log("setupConnection", args);
    //console.log(store.get(`servers.${args}`));
    const server = store.get(`servers.${args}`);
    if (!server) return;
    rustplus = new RustPlus(server.ip, server.port, server.playerId, server.playerToken);
    rustplus.connect();

    rustplus.on("connected", () => {
      console.log("connected to server");
      new Notification({
        title: "Sucessfully connected to server",
        body: "Listening for notifications",
      }).show();
u
      const cam = rustplus.getCamera("xsRoofN")
      cam.on("render", async data => {
        fs.writeFileSync("a.png", data);
        
      });
    });

    return store.get(`servers.${args}`);
  });

  ipcMain.handle("disconnect", async event => {
    console.log("disconnect");
    rustplus.once("disconnected", () => {
      console.log("disconnected from server");
    });
    try {
      rustplus.disconnect();
    } catch (error) {
      console.log(error);
    }
  });

  // handle send 
  ipcMain.handle("test", async (event, args) => {
    console.log("test", args);
    window.webContents.send("newSwitchAdded", {
      name: "Switch",
      entityId: "body.entityId",
      icon: "switch",
    });
  })
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    ipcMain.send("app-activate", "app-activate");
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const store = new Store({
  defaults: {
    persistentIds: [],
    servers: {},
  },
});
// ---------------------------------------- store.openInEditor();

// recive data from the renderer process

fcmListen((body, persistentId) => {
  const currentPresistentIds = store.get("persistentIds") || [];
  if (currentPresistentIds.includes(persistentId)) {
    return console.log("already sent");
  }
  store.set("persistentIds", [...currentPresistentIds, persistentId]);

  if (body.entityName == "Switch") {
    if (store.get(`servers.${body.id}.switches`).find(s => s.entityId == body.entityId)) return console.log("already added");
    console.log("adding");
    store.set(`servers.${body.id}.switches`, [
      ...store.get(`servers.${body.id}.switches`),
      {
        name: "Switch",
        entityId: body.entityId,
        icon: "switch",
      },
    ]);
    window.webContents.send("newSwitchAdded", {
      name: "Switch",
      entityId: body.entityId,
      icon: "switch",
    });
  } else if (body.type == "server") {
    if (store.get("servers")[body.id]) return console.log("already added");
    store.set(`servers.${body.id}`, {
      ...body,
      switches: [],
    });
  } else console.log(body.type);
});

module.exports = {
  rustplus,
};

require("./main/RustEvents.ts");
