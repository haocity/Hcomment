const webpack = require('webpack')
var path = require('path');
module.exports = {
	plugins: [
	new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
   })
	],
  entry: './src/index.js',
  output: {
    filename: 'hco.js',
    path: path.resolve(__dirname, 'dist')
  },module: {
        rules:[
            {
                test: /\.js$/,
                loader:"babel-loader",
                include: /src/,
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				include: /src/,
                exclude: /node_modules/
			}

        ]
    }
};
