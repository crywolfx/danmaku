const fs = require('fs');
const path = require('path');
const paths = require('../paths');
const renderContent = require('../template/content');
const renderDevtools = require('../template/devtools');

const generate = (fullPath, scriptString) => {
  fs.writeFileSync(fullPath, scriptString);
  return fullPath;
}

exports.generateContent = (entrys) => {
  const stylePath = 'static/css/content/index.css';
  const scriptString = renderContent(entrys, stylePath);
  return generate(path.join(paths.entryPath, 'content.tsx'), scriptString);
};

exports.generateDevtools = (entrys) => {
  const scriptString = renderDevtools(entrys);
  return generate(path.join(paths.entryPath, 'devtools.ts'), scriptString);
}

exports.generateDevtoolsFileName = renderDevtools.createFileName;

exports.generateEntry = () => {
  if (!fs.existsSync(paths.entryPath)) {
    fs.mkdirSync(paths.entryPath, { recursive: true });
    console.log('entry已创建');
  } else {
    console.log('entry已存在');
  }
}