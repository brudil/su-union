var mixins = require('./src/css/mixins');

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins')({
      mixins: mixins,
    }),
    require('postcss-ant')(),
    require('postcss-lh'),
    require('postcss-nested'),
    require('postcss-cssnext'),
  ],
};
