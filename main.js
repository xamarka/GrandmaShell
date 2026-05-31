const {
  app,
  BrowserWindow,
  WebContentsView,
  ipcMain,
  Menu,
  shell,
  session,
} = require('electron');
const path = require('path');
const { execFile, exec } = require('child_process');

const NAV_BAR_HEIGHT = 72;
const YOUTUBE_TV_URL = 'https://www.youtube.com/tv#/';
const YOUTUBE_FALLBACK_URL = 'https://www.youtube.com/tv';
const KINOPOISK_URL = 'https://hd.kinopoisk.ru';
const VK_VIDEO_URL = 'https://vkvideo.ru/';
const GOOGLE_URL = 'https://www.google.com/';

const TV_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 10; BRAVIA 4K VH2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';
const DESKTOP_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';

let mainWindow = null;
let browserView = null;
let tvSessionReady = false;

function getTvSession() {
  const tvSession = session.fromPartition('persist:tvbox-browser');

  if (!tvSessionReady) {
    tvSessionReady = true;
    tvSession.setUserAgent(DESKTOP_USER_AGENT);
    tvSession.webRequest.onBeforeSendHeaders(
      { urls: ['*://*.youtube.com/*', '*://*.googlevideo.com/*'] },
      (details, callback) => {
        const headers = { ...details.requestHeaders };
        headers['Accept-Language'] = 'ru-RU,ru;q=0.9';
        callback({ requestHeaders: headers });
      },
    );
  }

  return tvSession;
}

function sendDisplayMode() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('display-mode-changed', {
    fullscreen: mainWindow.isFullScreen(),
  });
}

function setDisplayMode(fullscreen) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return { fullscreen: false };
  }

  if (fullscreen) {
    mainWindow.setFullScreen(true);
  } else {
    mainWindow.setFullScreen(false);
    mainWindow.unmaximize();
    mainWindow.setSize(1280, 720);
    mainWindow.center();
  }

  updateBrowserBounds();
  sendDisplayMode();
  return { fullscreen: mainWindow.isFullScreen() };
}

function toggleDisplayMode() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return { fullscreen: true };
  }

  return setDisplayMode(!mainWindow.isFullScreen());
}

function getBrowserBounds() {
  if (!mainWindow) {
    return { x: 0, y: 0, width: 1280, height: 720 - NAV_BAR_HEIGHT };
  }

  const [width, height] = mainWindow.getContentSize();
  return {
    x: 0,
    y: 0,
    width,
    height: Math.max(0, height - NAV_BAR_HEIGHT),
  };
}

function updateBrowserBounds() {
  if (browserView) {
    browserView.setBounds(getBrowserBounds());
  }
}

function sendBrowserState() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  const webContents = browserView?.webContents;
  mainWindow.webContents.send('browser-state-changed', {
    isOpen: Boolean(browserView),
    canGoBack: webContents?.canGoBack() ?? false,
    canGoForward: webContents?.canGoForward() ?? false,
  });
}

function closeBrowserView() {
  if (!browserView || !mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.contentView.removeChildView(browserView);
  browserView.webContents.close();
  browserView = null;

  mainWindow.webContents.send('show-home');
  sendBrowserState();
}

function openUrlInBrowserView(url, service) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  if (browserView) {
    closeBrowserView();
  }

  browserView = new WebContentsView({
    webPreferences: {
      partition: 'persist:tvbox-browser',
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  getTvSession();
  browserView.setBackgroundColor('#000000');
  browserView.webContents.setUserAgent(
    service === 'youtube' ? TV_USER_AGENT : DESKTOP_USER_AGENT,
  );

  browserView.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    browserView.webContents.loadURL(targetUrl);
    return { action: 'deny' };
  });

  browserView.webContents.on('did-navigate', (_event, navigatedUrl) => {
    if (service === 'youtube' && browserView) {
      const onMainYoutube =
        /^https:\/\/(www\.)?youtube\.com\/?(\?.*)?$/.test(navigatedUrl) ||
        /^https:\/\/(www\.)?youtube\.com\/$/.test(navigatedUrl);

      if (onMainYoutube) {
        browserView.webContents.loadURL(YOUTUBE_TV_URL);
        return;
      }
    }
    sendBrowserState();
  });

  browserView.webContents.on('did-navigate-in-page', sendBrowserState);
  browserView.webContents.on('did-finish-load', sendBrowserState);

  browserView.webContents.on('did-fail-load', (_event, errorCode, _desc, validatedURL) => {
    if (errorCode === -3 || !browserView) {
      return;
    }

    if (service === 'youtube' && validatedURL.startsWith(YOUTUBE_TV_URL.replace('#/', ''))) {
      browserView.webContents.loadURL(YOUTUBE_FALLBACK_URL);
    }
  });

  mainWindow.contentView.addChildView(browserView);
  browserView.setBounds(getBrowserBounds());
  browserView.webContents.loadURL(url);

  mainWindow.webContents.send('hide-home');
  sendBrowserState();
}
function shutdownSystem() {
  return new Promise((resolve) => {
    if (process.platform === 'win32') {
      exec('shutdown /s /t 0', (err) => {
        resolve({ ok: !err, error: err?.message });
      });
      return;
    }

    execFile('loginctl', ['poweroff'], (err1) => {
      if (!err1) { resolve({ ok: true }); return; }
      execFile('systemctl', ['poweroff'], (err2) => {
        if (!err2) { resolve({ ok: true }); return; }
        exec('shutdown -h now', (err3) => {
          resolve({ ok: !err3, error: err3?.message });
        });
      });
    });
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 960,
    minHeight: 540,
    title: 'GrandmaShell',
    show: false,
    fullscreen: false,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: '#0f0f0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.once('ready-to-show', () => {
    setDisplayMode(true);
    mainWindow.show();
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.on('resize', updateBrowserBounds);
  mainWindow.on('enter-full-screen', sendDisplayMode);
  mainWindow.on('leave-full-screen', sendDisplayMode);

  mainWindow.on('closed', () => {
    browserView = null;
    mainWindow = null;
  });
}

ipcMain.handle('open-service', (_event, service) => {
  const urls = {
    youtube: YOUTUBE_TV_URL,
    kinopoisk: KINOPOISK_URL,
    vkvideo: VK_VIDEO_URL,
    google: GOOGLE_URL,
  };

  const url = urls[service];
  if (url) {
    openUrlInBrowserView(url, service);
  }
});

ipcMain.handle('open-url', (_event, url, service) => {
  if (url) {
    openUrlInBrowserView(url, service || null);
  }
});

ipcMain.handle('go-home', () => {
  closeBrowserView();
});

ipcMain.handle('go-back', () => {
  if (browserView?.webContents.canGoBack()) {
    browserView.webContents.goBack();
  }
  sendBrowserState();
});

ipcMain.handle('go-forward', () => {
  if (browserView?.webContents.canGoForward()) {
    browserView.webContents.goForward();
  }
  sendBrowserState();
});

ipcMain.handle('reload', () => {
  if (browserView) {
    browserView.webContents.reload();
  }
});

ipcMain.handle('close-page', () => {
  closeBrowserView();
});

ipcMain.handle('quit-app', () => {
  app.quit();
});

ipcMain.handle('shutdown', () => shutdownSystem());

ipcMain.handle('toggle-display-mode', () => toggleDisplayMode());

ipcMain.handle('get-display-mode', () => ({
  fullscreen: mainWindow?.isFullScreen() ?? true,
}));

ipcMain.handle('get-browser-state', () => {
  const webContents = browserView?.webContents;
  return {
    isOpen: Boolean(browserView),
    canGoBack: webContents?.canGoBack() ?? false,
    canGoForward: webContents?.canGoForward() ?? false,
  };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('web-contents-created', (_event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    if (browserView && contents === browserView.webContents) {
      browserView.webContents.loadURL(url);
    } else {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
});
