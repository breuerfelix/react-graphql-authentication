var webpack = require('webpack');
var path = require('path');
var dev = process.env.NODE_ENV !== 'production';

module.exports = {
    devtool: dev ? 'eval-source-map' : 'none',
    context: path.resolve(__dirname, 'src'),
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, '../public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        port: 8080,
        proxy: {
            '/api': 'http://localhost:3000',
            '/giql': 'http://localhost:3000',
            '/gql': 'http://localhost:3000'
        }
    }
};
