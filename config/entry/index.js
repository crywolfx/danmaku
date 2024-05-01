const {
  optionsEntry,
  popupEntry,
  devtoolsEntry,
  backgroundEntry,
  contentEntry,
  ...others
} = require('./base');
const { generateContent, generateDevtools, generateEntry, generateDevtoolsFileName } = require('../generate');
const { resolveApp } = require('../paths');
generateEntry();

const isProduction = process.env.NODE_ENV === 'production';
const isHot = process.env.HOT === 'true';

const entry = {};
const devtoolsReallyEntry = {};
if (popupEntry.length) {
  entry.popup = popupEntry
}
if (optionsEntry.length) {
  entry.options = optionsEntry
}
if (backgroundEntry.length) {
  entry.background = backgroundEntry
}
if (contentEntry.length) {
  entry.content = generateContent(contentEntry)
}
if (devtoolsEntry.length) {
  entry.devtoolsEntry = generateDevtools(devtoolsEntry);
  devtoolsEntry.map((path) => {
    devtoolsReallyEntry[`${generateDevtoolsFileName(path)}`] = path;
  });
  Object.assign(entry, devtoolsReallyEntry);
}

if (!isProduction && isHot) {
  entry.hotContent = resolveApp('config/reload/content.ts');
  entry.hotBackground = resolveApp('config/reload/background.ts');
}

module.exports = { ...others, devtoolsReallyEntry, entry };
