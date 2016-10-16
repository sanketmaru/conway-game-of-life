module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
         test: /\.scss$/,
         loaders: [
           'isomorphic-style-loader',
           'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
           'postcss-loader'
         ]
       }
    ],

  }
}
