import {
  app,
  BrowserWindow,
  dialog,
  Menu
} from 'electron';
import path from 'path'
import url from 'url'

let mainWindow;
let currentFile;

const createWindow = (fileToOpen) => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadSettings = { fileToOpen }
  mainWindow.loadURL(url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '..', 'index.html')
  }))
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createApplicationMenu();
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

const openFile = (filenames) => {
  if (filenames) {
    currentFile = filenames[0]
    createWindow(currentFile)
  }
}

const createApplicationMenu = () => {
  const applicationMenu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            dialog.showOpenDialog({
              properties: [
                'openFile'
              ]
            }, openFile)
          }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    const name = app.getName()
    applicationMenu.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          role: 'about'
        },
        { type: 'separator' },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(applicationMenu)
  Menu.setApplicationMenu(menu)
}
