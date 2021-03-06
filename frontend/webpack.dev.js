const common = require('./webpack.common')
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[name].[ext]'
                }
            }
        ]
    }
})