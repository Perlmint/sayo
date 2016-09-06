config = Object.assign({}, require('./webpack.config'));
config.inline = true;
config.hot = true;
config.devServer = {
	publicPath: '/static/',
	port: 3001,
	lazy: false,
	inline: true,
	hot: true,
	headers: {'Access-Control-Allow-Origin': '*'}
};
module.exports = config;
