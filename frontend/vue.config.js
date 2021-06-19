module.exports = {
  devServer: {
    host: '172.20.10.2',
    // host: '192.168.123.54', // 172.20.10.2 // 192.168.123.54
    port: 8090,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // http://47.111.10.102:8085
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '一册医书'
      return args
    })
  }
}
