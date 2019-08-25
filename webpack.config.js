const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PACKAGE = require("./package");
const TerserJSPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
	const isDebug = (argv.mode === "development");

	const general_options = {
		mode: (isDebug ? "development" : "production"),
		optimization: {
			minimizer: (isDebug ? [] : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()]),
		}
	};

	const browser_options = {
		...general_options,
		resolve: {
			alias: {
				fs: __dirname + "/src/fs_browser_null.js",
				"fs-extra": __dirname + "/src/fs_browser_null.js",
				"graceful-fs": __dirname + "/src/fs_browser_null.js",
				path: "path-browserify", // Latest version which supports `path.parse`
				readdirp: __dirname + "/src/fs_browser_null.js"
			}
		},
		target: "web"
	};

	return [
		{
			...general_options,
			entry: {
				index: "./src/index.js",
				cli: "./src/cli.js"
			},
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
			...browser_options,
			entry: {
				browser: "./src/index.js"
			},
			output: {
				filename: "[name].js",
				path: __dirname + "/dist",
				libraryTarget: "umd",
				globalObject: "this" // Fix worker
			}
		},
		{
			...browser_options,
			entry: {
				index: "./src/webapp/js/index.js"
			},
			module: {
				rules: [
					{
						test: /\.less$/,
						use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
					},
					{
						test: /\.worker\.js$/,
						loader: "worker-loader",
						options: {
							name: "[name].[ext]"
						}
					}
				]
			},
			output: {
				filename: "index.js",
				path: __dirname + "/dist/",
				globalObject: "this" // Fix worker
			},
			plugins: [
				new HtmlWebpackPlugin({
					minify: (isDebug ? false : {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true
					}),
					template: "./src/webapp/html/index.html"
				}),
				new MiniCssExtractPlugin(),
				new FaviconsWebpackPlugin({
					devMode: "webapp",
					logo: "./src/webapp/img/icon.svg",
					mode: "webapp",
					favicons: {
						appDescription: PACKAGE.description,
						appName: PACKAGE.productName,
						appShortName: PACKAGE.productName,
						appleStatusBarStyle: "black",
						background: "#FFFFFF",
						developerName: PACKAGE.author,
						developerURL: null,
						dir: null,
						display: "standalone",
						icons: {
							android: true,
							appleIcon: true,
							favicons: true,
							appleStartup: false,
							coast: false,
							firefox: false,
							windows: false,
							yandex: false
						},
						lang: null,
						manifestRelativePaths: true,
						orientation: "any",
						path: "./",
						start_url: "..",
						theme_color: "#795548",
						version: PACKAGE.version
					},
					prefix: "webapp",
					publicPath: "./"
				})
			]
		}
	];
};
