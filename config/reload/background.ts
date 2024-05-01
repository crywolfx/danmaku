import { getTab } from 'chrome-extension-core';
import { hotReloadEvent } from './event';

let isReady = false;
const hotLog = (msg: string) => {
  console.log(`\n`);
  console.log(
    '\x1b[33m%s\x1b[0m',
    `**************[chrome-hot-background-msg]**************`
  );
  console.log('\x1b[33m%s\x1b[0m', new Date());
  console.log('\x1b[32m%s\x1b[0m', msg);
  console.log(
    '\x1b[33m%s\x1b[0m',
    `**************[chrome-hot-background-msg]**************`
  );
};
const ws = new WebSocket(
  `ws://${process.env.WDS_SOCKET_HOST}:${process.env.WDS_SOCKET_PORT}${process.env.WDS_SOCKET_PATH}`
);

let lastActivedId: number | undefined;
chrome.tabs.onActivated.addListener((activeInfo) => {
  lastActivedId = activeInfo.tabId;
});

const onMessage = async (data: any) => {
  hotLog(`on message: ${data.data}`);
  let dataInfo: any = {};
  try {
    dataInfo = JSON.parse(data.data);
  } catch (error) {}
  if (
    dataInfo.type === 'ok' ||
    dataInfo.type === 'still-ok' ||
    dataInfo.type === 'warnings'
  ) {
    if (!isReady) {
      hotLog(`first load`);
      isReady = true;
      return;
    }
    hotLog('start refresh');
    try {
      const tabInfo = await getTab({ active: true });
      await hotReloadEvent.emit('chromeHotReload', true, {
        type: 'tab',
        id: tabInfo?.id || lastActivedId,
      });
    } catch (error: any) {
      hotLog(error?.message || 'message error');
    } finally {
      // 应该在content刷新之前运行
      hotLog('start reload');
      chrome.runtime?.reload?.();
    }
  }
};

ws.onopen = () => {
  hotLog('connect open');
};
ws.onmessage = onMessage;
ws.onclose = () => {
  hotLog('connect closed');
};
ws.onerror = () => {
  hotLog('connect error');
};
