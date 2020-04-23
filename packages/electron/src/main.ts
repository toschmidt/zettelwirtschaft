import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { bootstrap } from '@zettelwirtschaft/backend';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: false,
      allowRunningInsecureContent: serve,
      devTools: serve,
    },
  });

  win.loadURL(
    serve
      ? 'http://localhost:8080'
      : url.format({
          pathname: path.join(__dirname, '../../frontend/bundle/index.html'),
          protocol: 'file:',
          slashes: true,
        }),
  );

  if (serve) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  return win;
}

function registerWindow(): void {
  app.allowRendererProcessReuse = true;

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
}

if (serve) {
  registerWindow();
} else {
  bootstrap().then(registerWindow);
}
