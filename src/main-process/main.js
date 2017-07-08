import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import createMacApplicationMenu from './menus/mac';
import fs from 'fs';
import path from 'path';
import url from 'url';

const windows = [];
let currentWindow;

const createWindow = (filename) => {
  let newWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    title: filename,
  });
  newWindow.loadSettings = { filename };
  newWindow.loadURL(url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '..', 'index.html'),
  }));
  newWindow.webContents.openDevTools();
  windows.push(newWindow);
  currentWindow = newWindow;
};

const saveFileAs = () => {
  dialog.showSaveDialog({}, (filename) => {
    currentWindow.webContents.send('save-file-as', { filename });
  });
};

const menuFunctions = {
  openFile(filenames) {
    if (filenames) {
      createWindow(filenames[0]);
    }
  },
  saveFile() {
    currentWindow.webContents.send('save-file');
  },
  saveFileAs() {
    saveFileAs();
  },
};

app.on('ready', () => {
  if (process.platform === 'darwin') {
    createMacApplicationMenu(menuFunctions);
  }
  createWindow();
});

app.on('browser-window-focus', (event, window) => {
  currentWindow = window;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!currentWindow || windows.length === 0) {
    createWindow();
  }
});

ipcMain.on('open-save-dialog', () => {
  saveFileAs();
});

ipcMain.on('update-window-title', (event, props) => {
  currentWindow.setTitle(props.title);
});
