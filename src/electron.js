/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import PdfPrinter from 'pdfmake';
import fs from 'fs';

let mainWindow;

ipcMain.on('get-path', (event, arg) => {
  const path = dialog.showSaveDialog({
    title: 'Save pdf report',
    defaultPath: 'Kronos-Report.pdf',
    filters: [
      { name: 'Pdf dockuments', extensions: ['pdf'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  mainWindow.webContents.send('set-path', { path });
});

ipcMain.on('close-main-window', (event, arg) => {
  app.quit();
});

ipcMain.on('minimize-main-window', (event, arg) => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('print', (event, data, path) => {
  const fonts = {
    Roboto: {
      normal: './fonts/Roboto-Regular.ttf',
      bold: './fonts/Roboto-Medium.ttf',
      italics: './fonts/Roboto-Italic.ttf',
      bolditalics: './fonts/Roboto-MediumItalic.ttf'
    }
  };

  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(JSON.parse(data));
  pdfDoc.pipe(fs.createWriteStream(path));
  pdfDoc.end();
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
