import * as webpack from "webpack";

const config: webpack.Configuration = {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    entry: "./src/index.tsx",

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ],
    },

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },

    resolve: {
        alias: {
          common: "../../src",
          platformSpecific: "../src-platformspecific/web",
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
};

export default config;
