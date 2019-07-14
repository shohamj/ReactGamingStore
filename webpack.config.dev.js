import path from 'path';
import webpack from 'webpack'

export default {
    entry: ['webpack-hot-middleware/client',path.join(__dirname, '/client/index.js')],
    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: 'http://localhost:3000/', 
    },
    module: {
        rules: [
            {
                loaders: [ 'babel-loader']
            },
            { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader' },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      // path where the  client/images will be saved
                      name: '[path][name].[ext]',
                    }
                  },
                //   {
                //     loader: 'url-loader',
                //   },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        quality: 65
                      },
                      pngquant:{
                        quality: "10-20",
                        speed: 4
                      },
                      svgo:{
                        plugins: [
                          {
                            removeViewBox: false
                          },
                          {
                            removeEmptyAttrs: false
                          }
                        ]
                      },
                      gifsicle: {
                        optimizationLevel: 7,
                        interlaced: false
                      },
                      optipng: {
                        optimizationLevel: 7,
                        interlaced: false
                      }
                    }
                  }
                ]
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