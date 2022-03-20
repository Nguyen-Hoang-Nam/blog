import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

export default {
    mode: "production",
    entry: {
        index: path.resolve("src", "js", "index.ts"),
        solana: path.resolve("src", "js", "solana.ts"),
        lazyLoad: path.resolve("src", "js", "lazyLoad.ts"),
    },
    devtool: "source-map",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve("static", "js"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.ts$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: "ts-loader",
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),

            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
                parallel: true,
            }),
        ],
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [new MiniCssExtractPlugin()],
};
