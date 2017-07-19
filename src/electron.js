/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import { app, BrowserWindow, ipcMain } from 'electron';

let mainWindow;

ipcMain.on('export', (event, arg) => {
  // TODO: Can receive more than one arg? see importexport.js
  console.log(arg);
});

ipcMain.on('close-main-window', (event, arg) => {
  app.quit();
});

ipcMain.on('minimize-main-window', (event, arg) => {
  BrowserWindow.getFocusedWindow().minimize();
});

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
