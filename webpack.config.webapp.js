const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require("offline-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PACKAGE = require("./package");
const TerserJSPlugin = require("terser-webpack-plugin");

const isDebug = (process.env.NODE_ENV === "development");

module.exports = {
    devServer: {
        disableHostCheck: true,
        host: "127.0.0.1",
        open: true,
        port: 8080
    },
    entry: {
        index: "./src/webapp/js/index.js"
    },
    mode: (isDebug ? "development" : "production"),
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
                test: /worker\.js$/,
                loader: "worker-loader",
                options: {
                    name: "[name].[ext]?h=[contenthash]"
                }
            }
        ]
    },
    optimization: {
        minimizer: (isDebug ? [] : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()]),
    },
    output: {
        filename: "[name].js?h=[contenthash]",
        path: __dirname + "/dist/webapp",
        globalObject: "this" // Fix worker
    },
    plugins: [
        new CleanWebpackPlugin(),
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
        new MiniCssExtractPlugin({
            filename: "[name].css?h=[contenthash]",
        }),
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
        }),
        ...(!isDebug ? [new OfflinePlugin({
            ServiceWorker: {
                events: true
            }
        })] : [])
    ],
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
