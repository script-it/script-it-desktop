import { app, dialog, Menu } from 'electron';

const name = app.getName();
const createMacApplicationMenu = (menuFunctions) => {
  const applicationMenu = [
    {
      label: name,
      submenu: [
        {
          label: `Quit ${name}`,
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        },
      ],
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog({
              properties: [
                'openFile',
              ],
            }, menuFunctions.openFile);
          },
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click() {
            menuFunctions.saveFile();
          },
        },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            menuFunctions.saveFileAs();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(applicationMenu);
  Menu.setApplicationMenu(menu);
};

export default createMacApplicationMenu;
