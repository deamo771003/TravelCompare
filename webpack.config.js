// 拼接路徑
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 設定環境
  mode: "development",
  // 指定入口文件
  entry: "./src/app.ts",
  output: {
    // 指定打包路徑
    path: path.resolve(__dirname, 'dist'),
    // 打包文件名稱
    filename: "bundle.js",
    environment: {
      arrowFunction: true
    }
  },
  // 指定打包要使用的模塊
  module: {
    // 指定要加入的規則
    rules: [
      {
        // 指定loader規則要生效的文件為所有以.ts為結尾的檔案
        test: /\.ts$/,
        // 帶入加載器
        use: [
          {
            // 指定加載器
            loader: "babel-loader",
            // 設置babel
            options: {
              // 設定預定地環境
              presets: [
                [
                  // 指定環境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的瀏覽器
                    targets: "> 0.25%, not dead",
                    // 指定corejs版本
                    "corejs": "3",
                    // 使用corejs的方式，"usage"指案需求加載
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // 要使用的loader為ts結尾的loader
          'ts-loader',
        ],
        // 指定要排除打包的檔案
        exclude: /node_modules/
      },
      // 設置less處理
      {
        // 處理所有.less結尾的檔案
        test: /\.less$/,
        // 指定要使用的loader，執行順序由下至上
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    // 指定瀏覽器版本
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  // 配置Webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // 自定義html模板路徑，給予打包範例來打包相同設定的HTML
      template: "./src/index.html"
    })
  ],
  // 設置引用模塊
  resolve: {
    extensions: ['.ts', '.js']
  },
  watch: true
}