const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //非js脚本打包成单独文件，如css

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDev = process.env.NODE_ENV === 'development'; //是否是开发环境

const config = {
    target:'web',
    entry: path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.jsx$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    // 大约小于10kb的图片变成base64编码继承到js中，比较大的图片仍然以url方式引入
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            },
        ]
    }
}

if(isDev){  //开发环境
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            'less-loader'
        ]
    });
    config.devtool = '#cheap-module-eval-source-map';//帮助开发调试
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true,  //数据变更，页面不刷新
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}else{  //正式环境
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    };
    config.optimization = {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks:{
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                }
            }
        }
    }

    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.less$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader"
        ]
    });
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "styles.[contentHash:8].css"
        })
    );
}

module.exports = config;