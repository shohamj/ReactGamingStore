import path from 'path';
import webpack from 'webpack'

export default {
    entry: ['webpack-hot-middleware/client',path.join(__dirname, '/client/index.js')],
    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: '/', 
    },
    module: {
        rules: [
            {
                loaders: [ 'babel-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js']
    },
    mode: 'development'
}