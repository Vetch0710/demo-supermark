const actions = {
  addCart(context, info) {
    // console.log(info);
    // 1.查看是否添加过
    return new Promise((resolve,reject)=>{
      let oldInfo = context.state.cartList.find(item => item.iid === info.iid)

      // 2.+1或者新添加
      if (oldInfo) {
        context.commit('addCounter',oldInfo)
        resolve("商品数量+1")
      } else {
        info.count = 1
        info.checked = true
        context.commit('addCart',info)
        resolve("添加了新商品")
      }
    })

  }
}

export default actions

