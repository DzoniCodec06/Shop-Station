const { app, BrowserWindow, ipcMain } = require("electron");

let homeScreen = "./src/home_screen/index.html";
let stockScreen = "./src/stock_and_location_app/index.html";

const createHomeWin = () => {
    let win = new BrowserWindow({
        width: 800,
        height: 500,
        maximizable: false,
        resizable: false,
        autoHideMenuBar: true,
        icon: "./images/logo.ico",
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile(homeScreen);
    //win.webContents.openDevTools();
}

const createStockAppWin = () => {
    let win = new BrowserWindow({
        maximizable: true,
        resizable: true,
        autoHideMenuBar: true,
        icon: "./images/logo.ico",
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile(stockScreen);
    win.maximize();
    //win.webContents.openDevTools();
}

app.on("ready", () => {
    createHomeWin();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createHomeWin();
    })
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
})

ipcMain.on("msg-from-home", (event, arg) => {
    console.log(`Received: ${arg}`);

    console.log(BrowserWindow.getAllWindows().forEach(window => {
        window.close();
        createStockAppWin();
    }))
})