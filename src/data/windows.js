import { AttributionWindow, BrowserWindow, FinderWindow, PaypalWindow, TerminalWindow } from 'components/windows';

let windowCount = 0;
const createWindow = (Component, windowKey, defaultWidth, defaultHeight, pinned = true) => {
  windowCount++;
  return {
    Component, windowKey, defaultWidth, defaultHeight, pinned,
    defaultLeft: windowCount * 20,
    defaultTop: windowCount * 20,
    defaultPath: `/${windowKey}`,
    path: `/${windowKey}`,
    opened: false,
    focused: false,
    instance: 0,
  };
};

export default [
  createWindow(FinderWindow, 'finder', 50 * 16, 30 * 16),
  createWindow(BrowserWindow, 'browser', 60 * 16, 40 * 16, false),
  createWindow(PaypalWindow, 'paypal', 50 * 16, 30 * 16),
  createWindow(TerminalWindow, 'terminal', 40 * 16, 28 * 16),
  createWindow(AttributionWindow, 'attribution', 30 * 16, 30 * 16),
];
