const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        chat: path.resolve(__dirname, './frontend/src/index.js'),  // path to our input file
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: function() {
                                    return [
                                        require('autoprexifer')
                                    ];
                                }
                            }
                        }
                    },
                    {loader: "sass-loader"},
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanWebpackPlugin(),
    ],
    mode: "development",
    output: {
        filename: '[name].bundle.js',  // output bundle file name
        path: path.resolve(__dirname, './app/static/dist'),  // path to our Flask static directory
    },
};