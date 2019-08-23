const webpack = require("webpack");

module.exports = [
	{
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
			new webpack.BannerPlugin({
				banner: "#!/usr/bin/env node",
				raw: true,
				exclude: "*",
				include: "cli.js"
			}),
		],
		target: "node"
	},
	{
		entry: {
			browser: "./src/index.js"
		},
		mode: "production",
		output: {
			filename: "[name].js",
			path: __dirname + "/dist",
			libraryTarget: "umd",
			globalObject: "this" // Fix worker
		},
		resolve: {
			alias: {
				fs: __dirname + "/src/fs_browser_null.js",
				"fs-extra": __dirname + "/src/fs_browser_null.js",
				"graceful-fs": __dirname + "/src/fs_browser_null.js",
				path: "path-browserify",
				readdirp: __dirname + "/src/fs_browser_null.js"
			}
		},
		target: "web"
	}
];
