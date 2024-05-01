const createRender = (paths) => paths.map((item) => `
  (() => {
    try {
    const contentModule = require('${item}');
    if (contentModule) {
      const config = contentModule.config || {};
      const Component = contentModule.default;
      const shadow = config.shadow === undefined ? true : config.shadow;
      const root = config.root instanceof HTMLElement ? config.root : document.documentElement;
      if (config.component) {
        mount(root, Component, shadow)
      }
    } 
  } catch (error) {
    console.error(error);
  }
  })();
`).join('\n')

const baseTpl = (stylePath) => {
  return `
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  const render = (props: any) => {
    const { container, Component } = props;
    if (container) {
      const root = ReactDOM.createRoot(
        container
      );
      root.render(
        <React.StrictMode>
          <Component />
        </React.StrictMode>
      );
    }
  };
  const mount = (root = document.documentElement, Component: any, shadow: any) => {
    const styleEl = document.createElement('link')
    const href = chrome.runtime.getURL('${stylePath}');
    styleEl.setAttribute('rel', 'stylesheet')
    styleEl.setAttribute('href', href);
    if (!shadow) {
      const $container = document.createElement('div');
      render({ container: $container, Component });
      root.appendChild($container);
      document.head.appendChild(styleEl);
    } else {
      const shadowContainer = document.createElement('div');
      const shadowConfig = Object.prototype.toString.call(shadow) === '[object Object]' ? shadow : { mode: 'open' };
      const shadowRoot = shadowContainer.attachShadow(shadowConfig);
      const $container = document.createElement('div');
      render({ container: $container, Component });
      shadowRoot.append(styleEl);
      shadowRoot.append($container);
      root.appendChild(shadowContainer);
    }
  }`
}

module.exports = (path, stylePath) => {
  const paths = Array.isArray(path) ? path : [path];
  return paths.length ? `
  ${baseTpl(stylePath)}
  ${createRender(paths)}
  ` : '';
}