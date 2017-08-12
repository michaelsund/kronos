/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import PdfPrinter from 'pdfmake';
import path from 'path';
import fs from 'fs';

let mainWindow;

ipcMain.on('get-path', (event, arg) => {
  const filePath = dialog.showSaveDialog({
    title: 'Save pdf report',
    defaultPath: 'Kronos-Report.pdf',
    filters: [
      { name: 'Pdf dockuments', extensions: ['pdf'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  mainWindow.webContents.send('set-path', { filePath });
});

ipcMain.on('close-main-window', (event, arg) => {
  app.quit();
});

ipcMain.on('minimize-main-window', (event, arg) => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('print', (event, data, filePath) => {
  let fonts;
  if (process.env.NODE_ENV === 'development') {
    fonts = {
      Roboto: {
        normal: path.join(__dirname, '..', 'fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '..', 'fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '..', 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '..', 'fonts/Roboto-MediumItalic.ttf'),
      }
    };
  } else {
    fonts = {
      Roboto: {
        normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf'),
      }
    };
  }

  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(JSON.parse(data));
  pdfDoc.pipe(fs.createWriteStream(filePath));
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
