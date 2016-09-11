var webpack = require("webpack");
config = Object.assign({}, require('./webpack.config'));
config.inline = true;
config.devServer = {
	publicPath: '/static/',
	port: 3001,
	lazy: false,
	inline: true,
	headers: {'Access-Control-Allow-Origin': '*'}
};
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;
