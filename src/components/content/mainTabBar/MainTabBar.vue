<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon" src="~assets/img/icon/check-circle.png" alt="">
      <img slot="item-icon-active" src="~assets/img/icon/close-circle.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <img slot="item-icon" src="~assets/img/icon/CI.png" alt="">
      <img slot="item-icon-active" src="~assets/img/icon/frown.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" >
      <img slot="item-icon" src="~assets/img/icon/compass.png" alt="">
      <img slot="item-icon-active" src="~assets/img/icon/info-circle.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="grey">
      <img slot="item-icon" src="~assets/img/icon/Dollar.png" alt="">
      <img slot="item-icon-active" src="~assets/img/icon/left-circle.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>

  import TabBar from "../tabbar/TabBar";
  import TabBarItem from "../tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
