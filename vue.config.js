const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: ['.van', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },
  publicPath: './', // 基本路径
  // 使用运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false,

  devServer: {
    // open: false, // 是否自动打开浏览器页面
    // port: 8888, // 端口地址
    // https: false, // 使用https提供服务
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // proxy: 'http://116.236.220.218:39080', // app
    // proxy: 'http://116.236.220.215:39088'// web端
    // proxy: 'http://192.168.102.23:7000'//孟磊
    // proxy: 'http://192.168.102.123:7000'// 张云飞1
    before (app) {
      app.post('/olap-auth/login', (req, res) => {
        res.json([
          { id: 1, name: '卤蛋' }
        ])
      })
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
