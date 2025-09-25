const dotenv = require('@dotenvx/dotenvx');
const fs = require('fs');
const path = require('path');
const { configure } = require('../../build/config');

const envfile = path.join(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`);
if (fs.existsSync(envfile)) { dotenv.config({ path: envfile }); }
exports.default = configure({
  baseURL: 'http://localhost:8080/',
  browserOptions: { instance: 'chromium', headless: process.env.HEADLESS !== 'false' },
  debug: process.env.DEBUG === 'true',
  tags: process.env.TAGS ?? '',
  timeout: 8000,
  parallel: +(process.env.PARALLEL ?? 10),
  snapshots: { images: { maxDiffPixelRatio: 0.5 } }
});
