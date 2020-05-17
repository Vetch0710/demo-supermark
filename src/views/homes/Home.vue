<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
      <li>6</li>
    </ul>
  </div>
</template>

<script>
  /* 公用组件 */
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
/* 子组件 */
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

/* 函数方法 */
  import {getHomeMultidata} from "network/home";

  export default {
    name: "home",
    components: {
      NavBar,
      TabControl,

      HomeSwiper,
      HomeRecommendView,
      FeatureView,

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'news':{page:0,list:[]},
          'sell':{page:0,list:[]}
        }
      }
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  #home{
    padding-top:  44px;
    /*padding-bottom: 49px;*/
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
</style>
