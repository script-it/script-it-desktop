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
  newWindow.on('close', () => {
    windows.splice(windows.indexOf(newWindow), 1);
    if (currentWindow === newWindow) {
      currentWindow = windows[windows.length - 1];
    }
  });
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
  createWindow(filenames) {
    if (filenames) {
      createWindow(filenames[0]);
    } else {
      createWindow()
    }
  },
  closeWindow() {
    currentWindow.close();
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
