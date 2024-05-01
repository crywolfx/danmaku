module.exports = function (isHot = false) {
  const baseTpl = `
  function tryImport (path) {
    try {
      importScripts(path);
    } catch (error) {
      console.error('import ' + path + ' error, message: ', error);
    }
  };
`
  const hotTpl = isHot && `tryImport('./hotBackground/index.js');` || '';
  return `${baseTpl}${hotTpl}tryImport('./background/index.js');`
}