const webpack = require("webpack");

module.exports = {
	entry: {
		index: "./src/index.js",
		cli: "./src/cli.js"
	},
	mode: "production",
	output: {
		filename: "[name].js",
		path: __dirname + "/dist",
		libraryTarget: "umd"
	},
	plugins: [
		new webpack.BannerPlugin({banner: "#!/usr/bin/env node", raw: true, exclude: "*", include: "cli.js"}),
	],
	target: "node"
};
