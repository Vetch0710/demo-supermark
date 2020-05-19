const actions = {
  addCart(context, info) {
    // console.log(info);
    // 1.查看是否添加过
    const oldInfo = context.state.cartList.find(item => item.iid === info.iid)

    // 2.+1或者新添加
    if (oldInfo) {
      context.commit('addCounter',oldInfo)
    } else {
      info.count = 1
      info.checked = true
      context.commit('addCart',info)

    }
  }
}

export default actions

