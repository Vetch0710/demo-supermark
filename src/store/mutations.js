const mutations = {
  //只单一修改state状态，复杂的判断放入action中
 /* addCart(state, info) {
    console.log(info);
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.iid === info.iid)

    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      info.count = 1
      info.checked = true
      state.cartList.push(info)
      console.log(state.cartList)
    }
  }*/
  addCounter(state,payload){
    payload.count++
  },
  addCart(state,payload){
    state.cartList.push(payload)
  }
}

export default mutations

