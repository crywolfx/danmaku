const fs = require('fs');
const paths = require('../paths');

const dataPaths = [paths.optionsSrc, paths.popupSrc, paths.devtoolsSrc, paths.backgroundSrc, paths.contentSrc]

const getEntry = (path) => {
  if (!fs.existsSync(path)) return [];
  return fs.readdirSync(path).filter((name) => name.match(/\.(ts|tsx)$/)).map((item) => `${path}/${item}`);
};

const [hasOptions, hasPopup, hasDevTool, hasBackground, hasContent] = dataPaths.map((p) => fs.existsSync(p));
const [optionsEntry, popupEntry, devtoolsEntry, backgroundEntry, contentEntry] = dataPaths.map((p) => getEntry(p));

const entry = {
  hasOptions,
  hasPopup,
  hasDevTool,
  hasBackground,
  hasContent,
  optionsEntry,
  popupEntry,
  devtoolsEntry,
  backgroundEntry,
  contentEntry
};

module.exports = entry;
module.exports.getEntry = getEntry;