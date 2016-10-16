var path = require('path')
var config = {
    entry: './public/scripts/app.js',
    resolve: {
        root: [
            path.resolve('./public/scripts')
        ],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: './public/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }]
    }
}
module.exports = config;
