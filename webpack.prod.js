const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)?$/, loader: 'awesome-typescript-loader' },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public', to: '.' }
        ])
    ]
};
