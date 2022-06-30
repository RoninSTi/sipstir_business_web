/* config-overrides.js */
const { addBabelPlugins, addWebpackAlias, override } = require('customize-cra');

const path = require('path');

module.exports = override(
 addWebpackAlias({
  '@actions': path.join(__dirname, 'src/redux/actions'),
  '@assets': path.join(__dirname, 'src/assets'),
  '@components': path.join(__dirname, 'src/components'),
  '@contexts': path.join(__dirname, 'src/contexts'),
  '@hooks': path.join(__dirname, 'src/hooks'),
  '@mutations': path.join(__dirname, 'src/mutations'),
  '@pages': path.join(__dirname, 'src/pages'),
  '@queries': path.join(__dirname, 'src/queries'),
  '@reducers': path.join(__dirname, 'src/redux/reducers'),
  '@redux': path.join(__dirname, 'src/redux'),
  '@sass': path.join(__dirname, 'src/sass'),
  '@services': path.join(__dirname, 'src/services'),
  '@selectors': path.join(__dirname, 'src/redux/selectors'),
  '@slices': path.join(__dirname, 'src/redux/slices'),
  '@views': path.join(__dirname, 'src/views'),
  '@utils': path.join(__dirname, 'src/utils'),
 }),
 ...addBabelPlugins('@babel/plugin-proposal-optional-chaining'),
);
