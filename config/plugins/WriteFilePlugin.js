class WriteFilePlugin {
  static defaultOptions = {
    outputFile: 'file.text',
  };

  constructor(options = {}) {
    this.options = { ...WriteFilePlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = WriteFilePlugin.name;
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      if (this.options.content) {
        compilation.emitAsset(this.options.outputFile, new RawSource(this.options.content));
      }
    });
  }
}

module.exports = WriteFilePlugin;
