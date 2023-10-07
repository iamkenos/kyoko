const { configure } = require('../../src/config');

exports.default = configure({
  require: ['fixtures/pages/**/*.def.ts']
});
