/* 这个新建的vue.config会将现有配置与原有配置整合 */

const path = require('path');//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports={
  configureWebpack:{
    resolve:{
      /*配置别名*/
       alias:{
         'assets':resolve('src/assets'),
         'common':resolve('src/common'),
         'components':resolve('src/components'),
         'network':resolve('src/network'),
         'views':resolve('src/views'),
       }
    }
  }
  // chainWebpack:config=>{
  //   config.resolve.alias
  //
  //     .set("assets",resolve('./src/assets'))
  //     .set("common",resolve('./src/common'))
  //     .set("components",resolve('./src/components'))
  //     .set("network",resolve('./src/network'))
  //     .set("views",resolve('./src/views'))
  // },
    //set第一个参数：设置的别名，第二个参数：设置的路径


}

