import { hotReloadEvent } from './event';

const hotLog = (msg: string) => {
  console.log(`[chrome-hot-content]: ${msg}`);
};
hotLog('hotreload connect');
hotReloadEvent.on('chromeHotReload', () => {
  hotLog('start refresh');
  setTimeout(() => {
    window.location.reload();
  }, 200);
});
