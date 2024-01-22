const { configure } = require('@iamkenos/kyoko/config');

// you can set most of the cucumber config props from here, leave some that are restricted.
exports.default = configure({
  baseURL: 'https://the-internet.herokuapp.com/',
  parallel: 5
});
