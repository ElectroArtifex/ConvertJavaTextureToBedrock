const {BannerPlugin} = require("webpack");

module.exports = (env, argv) => {
    const isDebug = (argv.mode === "development");

    return {
        entry: {
            index: "./src/index.js",
            cli: "./src/cli.js"
        },
        mode: (isDebug ? "development" : "production"),
        output: {
            filename: "[name].js",
            path: __dirname + "/dist",
            libraryTarget: "umd"
        },
        plugins: [
            new BannerPlugin({
                banner: "#!/usr/bin/env node",
                raw: true,
                exclude: "*",
                include: "cli.js"
            }),
        ],
        target: "node"
    };
};
