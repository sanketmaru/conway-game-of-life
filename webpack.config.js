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
       },
       {
         test: /\.css$/,
         loader: 'style-loader!css-loader'
       },
       {
         test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
         loader: 'url-loader',
         options: {
           limit: 10000
         }
       }
    ]
  }
}
