const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tvBox', {
  openService: (service) => ipcRenderer.invoke('open-service', service),
  openUrl: (url, service) => ipcRenderer.invoke('open-url', url, service),
  goHome: () => ipcRenderer.invoke('go-home'),
  goBack: () => ipcRenderer.invoke('go-back'),
  goForward: () => ipcRenderer.invoke('go-forward'),
  reload: () => ipcRenderer.invoke('reload'),
  closePage: () => ipcRenderer.invoke('close-page'),
  quitApp: () => ipcRenderer.invoke('quit-app'),
  shutdown: () => ipcRenderer.invoke('shutdown'),
  toggleDisplayMode: () => ipcRenderer.invoke('toggle-display-mode'),
  getDisplayMode: () => ipcRenderer.invoke('get-display-mode'),
  getBrowserState: () => ipcRenderer.invoke('get-browser-state'),
  onShowHome: (callback) => {
    ipcRenderer.on('show-home', () => callback());
  },
  onHideHome: (callback) => {
    ipcRenderer.on('hide-home', () => callback());
  },
  onBrowserStateChanged: (callback) => {
    ipcRenderer.on('browser-state-changed', (_event, state) => callback(state));
  },
  onDisplayModeChanged: (callback) => {
    ipcRenderer.on('display-mode-changed', (_event, state) => callback(state));
  },
});
