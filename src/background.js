'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
let win = null
let AutoLaunch = require('auto-launch');
let Electron = require('electron');
app.showExitPrompt = true;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  win.setMenu(null);

  win.on('close', (e) => {
    if (app.showExitPrompt) {
      const options = {
        type: 'question',  
        title: '腰Tune終了の確認',
        message: '本当に腰Tuneを終了しますか？',
        detail: '腰痛が悪化してもいいですか？',
        buttons: ['終了', 'キャンセル'],
        cancelId: 1
      };

      const selected = Electron.dialog.showMessageBoxSync(options);

      if(selected == 0)
      {
        win.destroy();
        app.quit();
      }
      else
      {
        e.preventDefault();
      }
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  // 自動起動設定を初期化
  var youtune = new AutoLaunch({
    name:'youtune',
    path:app.getPath('exe'),
  });
  
  youtune.isEnabled()
    .then(function(isEnabled){
      if(isEnabled){
        return;
      }
      // デバッグ時にはここはコメントアウトしておく
      youtune.enable();
    })
    .catch(function(err){
      // エラー捕捉時の動作
      new Notification("ERROR", { body: err })
    });

  // //二重起動の防止
  const doubleboot = app.requestSingleInstanceLock();
  if(!doubleboot){
    app.quit();
  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
