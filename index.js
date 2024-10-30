const { app, BrowserWindow } = require("electron");

const createWin = () => {
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

    win.loadFile("./src/home_screen/index.html");
    //win.webContents.openDevTools();
}

app.on("ready", () => {
    createWin();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWin();
    })
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
})
