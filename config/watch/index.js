const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const { contentSrc, devtoolsSrc } = require('../paths');
const { generateContent, generateDevtools } = require('../generate');
const { getEntry } = require('../entry/base');


const watch = (call, src, delay = 300) => {
  const debounceCallback = debounce(call, delay);
  chokidar.watch(src).on('add', debounceCallback).on('unlink', debounceCallback);
}

exports.watchContent = () => watch(() => generateContent(getEntry(contentSrc)), contentSrc);

exports.watchDevtool = () => watch(() => generateDevtools(getEntry(devtoolsSrc)), devtoolsSrc);