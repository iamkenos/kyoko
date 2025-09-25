const dotenv = require('@dotenvx/dotenvx');
const fs = require('fs');
const path = require('path');
const { configure } = require('../../build/config');

// example of using dotenv to load env vars from a file
const envfile = path.join(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`);
if (fs.existsSync(envfile)) { dotenv.config({ path: envfile }); }

// you can set most of the cucumber config props from here, leave some that are restricted.
// process.env vars are resolved from the loaded env file above
exports.default = configure({
  baseURL: 'https://the-internet.herokuapp.com/',
  browserOptions: { instance: 'chromium', headless: process.env.HEADLESS !== 'false' },
  debug: process.env.DEBUG === 'true',
  tags: process.env.TAGS ?? '',
  timeout: 10 * 1000,
  parallel: +(process.env.PARALLEL ?? 5),
  snapshots: { images: { maxDiffPixelRatio: 0.5 } }
});
