import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import createMacApplicationMenu from './menus/mac';

let mainWindow;

const createWindow = (fileToOpen) => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
  });
  mainWindow.loadSettings = { fileToOpen };
  mainWindow.loadURL(url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '..', 'index.html'),
  }));
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const menuFunctions = {
  openFile(filenames) {
    if (filenames) {
      createWindow(filenames[0]);
    }
  }
};

app.on('ready', () => {
  if (process.platform === 'darwin') {
    createMacApplicationMenu(menuFunctions);
  }
  createWindow();
});

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
