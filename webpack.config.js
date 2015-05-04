var bower_dir = __dirname + '/app/bower_components';

module.exports.getConfig = function(type) {

  var isDev = type === 'development';

  var config = {
    addVendor: function (name, path) {
      this.resolve.alias[name] = path;
      this.module.noParse.push(new RegExp(path));
    },
    resolve: { alias: {} },
    entry: './app/scripts/main.js',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    module: {
      noParse: [],
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
    }
  };

  // config.addVendor('react', bower_dir + '/react/react.min.js');

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
}