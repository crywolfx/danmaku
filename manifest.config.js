module.exports = function ({ version = '0.0.1', isProduction = false, isHot = false, name = 'chrome-extension' }) {
  const enableInspectHeader = !isHot || isProduction;
  const config = {
    action: {
      default_popup: 'popup.html',
    },
    background: {
      service_worker: 'backgroundEntry.js',
    },
    description: 'chrome extension template',
    host_permissions: ['<all_urls>'],
    manifest_version: 3,
    name: isProduction ? name : `[development]${name}`,
    offline_enabled: true,
    options_page: 'options.html',
    devtools_page: "devtoolsEntry.html",
    permissions: [
      'tabs',
      'activeTab',
      'storage',
      'cookies',
      'scripting',
      'system.display',
      'tabCapture',
      'contextMenus',
      enableInspectHeader && 'declarativeNetRequest',
    ].filter(Boolean),
    content_scripts: [
      {
        matches: ['<all_urls>'],
        css: [],
        js: ['content/index.js', isHot && 'hotContent/index.js'].filter(Boolean),
        run_at: 'document_end',
      },
    ],
    version,
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['static/css/content/index.css'],
      },
    ],
  };

  if (!isHot || isProduction) {
    config.declarative_net_request = {
      rule_resources: [],
    };
  }

  return config;
};

