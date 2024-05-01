const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryInfo = require('./entry');
const paths = require('./paths');

const create = (config, isEnvProduction) => {
  return new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        ...config
      },
      isEnvProduction
        ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
        : undefined
    )
  )
}

const devtoolTemplate = Object.keys(entryInfo.devtoolsReallyEntry).map((chunkName) => ({
  template: paths.devtoolsHtml,
  chunks: [chunkName],
  filename: `${chunkName}.html`
}))

const templates = [
  entryInfo.hasOptions && {
    template: paths.optionsHtml,
    chunks: ['options'],
    filename: `options.html`,
  },
  entryInfo.hasPopup && {
    template: paths.popupHtml,
    chunks: ['popup'],
    filename: `popup.html`
  },
  entryInfo.hasDevTool && {
    template: paths.devtoolsEntryHtml,
    chunks: ['devtoolsEntry'],
    filename: `devtoolsEntry.html`
  },
  ...devtoolTemplate
].filter(Boolean);

module.exports = (isEnvProduction) => templates.map((tpl) => create(tpl, isEnvProduction))