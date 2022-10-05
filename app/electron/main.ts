import {app, Tray} from 'electron'

import {creatAppTray} from './tray'

const updater = require("electron-updater");
const autoUpdater = updater.autoUpdater;
require('@electron/remote/main').initialize()

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

const appLock = app.requestSingleInstanceLock()

if (!appLock) {
    // 作为第二个实例运行时, 主动结束进程
    app.quit()
}

app.on('second-instance', () => {
    // 当运行第二个实例时, 打开或激活首页
    $tools.createWindow('Home')
})

app.on('ready', () => {
    tray = creatAppTray()
    $tools.createWindow('Home',{
      isInit: true
    })
})

app.on('activate', () => {
    if (process.platform == 'darwin') {
        $tools.createWindow('Home')
    }
})

app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    //   app.quit()
    // }
})

app.on('before-quit', () => {
    $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)

    if (process.platform === 'win32') {
        tray.destroy()
    }
})
///////////////////
// Auto upadater //
///////////////////
autoUpdater.requestHeaders = {"PRIVATE-TOKEN": "glpat-qrpsxjw38ucrxKsyRyTK"};
autoUpdater.autoDownload = true;
autoUpdater.setFeedURL({
    provider: "generic",
   // url: "https://gitlab.com/chinhpro2k/electron-base/-/jobs/artifacts/master/raw/dist?job=build"
    url: "http://gitlab.com/api/v4/projects/_PROJECT_ID_/jobs/artifacts/master/raw/dist?job=build"
});
autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', function (info: any) {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', function (info: any) {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', function (err: any) {
    sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', function (progressObj: any) {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', function (info: any) {
    sendStatusToWindow('Update downloaded; will install in 1 seconds');
});

autoUpdater.on('update-downloaded', function (info: any) {
    setTimeout(function () {
        autoUpdater.quitAndInstall();
    }, 1000);
});

autoUpdater.checkForUpdates();

function sendStatusToWindow(message: any) {
    console.log("kaka",message);
}

// ======================
