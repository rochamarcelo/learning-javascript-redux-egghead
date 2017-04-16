var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/app/root.js',
    output: {
        path: __dirname + '/client/js/', 
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './client',
        port: 8080
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env', 'es2015', 'react'],
                plugins: ["transform-object-rest-spread"]
            }
        }]
    }
}