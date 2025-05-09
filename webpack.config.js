const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // önceki derlemeleri temizler
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // src/index.html'den şablon alır
        })
    ],
   devServer: {
    static: './dist',
    port: 3000, // 8080 yerine 3000 yaptık
    open: true,
},
    mode: 'development'
};
