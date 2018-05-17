const path = require('path');
//判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
//基本配置
const config = {
  target:'web',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:{
          loader:"vue-loader"
        }
      },
      // {
      //   test:/\.jsx$/,
      //   use:{
      //     loader:"babel-loader"
      //   }
      // },
      // {
      //   test:/\.styl$/,
      //   use:[
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader:'postcss-loader',
      //       options:{
      //         sourceMap:true
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // },
      {
        test:/\.(gif|jpg|jpeg|png|svg)$/,
        use:[
          {
            loader:"url-loader",
            options:{
              limit:1024,
              name:'[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV : isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

//如果为开发环境，则配置devServer
if(isDev){
  config.module.rules.push({
      test:/\.css$/,
      use:[
        {
          loader:"style-loader"
        },
        {
          loader:"css-loader"
        }
      ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port:8000,
    host:'0.0.0.0',
    overlay:{
      //产生错误时在页面显示
      errors:true
    },
    //启动热加载:当改变组件时,页面不刷新
    hot:true
    // open:true当启动webpack-dev-server时自动打开网页
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}
//生产环境
else{
  config.entry = {
    app:path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
      test:/\.css$/,
      use:ExtractPlugin.extract({
        fallback:'style-loader',
        use:[
          'css-loader'
        ]
      })
  })
  config.plugins.push(
    //将css代码分离打包
    new ExtractPlugin('styles.[contentHash:8].css'),
    //将类库代码分离打包
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'runtime'
    }),
  )
}

module.exports = config;
