module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  //构建项目生成的目录 生产环境 和开发环境
  outputDir: process.env.NODE_ENV === 'production' ? 'public' : 'devpublic',
  //关闭语法编译警告
  lintOnSave: false
}
