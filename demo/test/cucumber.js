const { configure } = require('./fixtures/config');

exports.default = configure({
  require: ['fixtures/pages/**/*.steps.ts']
});
