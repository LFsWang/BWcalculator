const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/BWcalculator/'
  : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'BookWalker 折扣計算機'
        return args
      })
  }
})
