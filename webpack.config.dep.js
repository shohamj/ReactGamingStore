var path = require('path');
var webpack = require('webpack');


module.exports =  {
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/public'),
        publicPath: path.join(__dirname, '/public')
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components|client\\images)/,
              use: {
                loader: 'babel-loader',
                options: {
                  "presets": ["@babel/preset-env","@babel/preset-react"],
                  "plugins": [
                      [
                        "@babel/plugin-proposal-decorators",
                        {
                          "legacy": true
                        }
                      ],
                      [
                        "@babel/plugin-proposal-class-properties",
                        {
                          "loose": true
                        }
                      ],
                  ]
              }
              }
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
    mode: 'production'
}