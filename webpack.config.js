module.exports = {
	entry: './src/client.ts',
	output: {
		filename: './out/asset/client.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
}
