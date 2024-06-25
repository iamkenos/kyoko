const { configure } = require('../../build/config');
exports.default = configure({
  baseURL: 'http://localhost:8080/',
  browser: 'chromium',
  timeout: 8000,
  parallel: 10,
  headless: true,
  logLevel: 'info'
});
