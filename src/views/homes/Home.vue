<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  /* 公用组件 */
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  /* 子组件 */
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";


  /* 函数方法 */
  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,


      HomeSwiper,
      HomeRecommendView,
      FeatureView,

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      const refresh=this.debounce(this.$refs.scroll.refresh,200)
      //3.监听item中图片加载完成
      this.$bus.$on("itemImageLoad", () => {
        refresh()
      })
    },
    methods: {
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if (timer) clearInterval(timer)
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay)
        }
      },
      getHomeMultidata() {
        //1.请求多个数据
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;

        })
      },
      getHomeGoods(type) {
        //2.请求商品数据
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].page = page;
          this.goods[type].list.push(...res.data.list);

          this.$refs.scroll.finishPullUp()
        })
      },

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;

        }
      },
      backClick() {
        // 获取ref="scroll" 里的 scroll（scroll.vue中的数据） 属性
        // this.$refs.scroll.scroll.scrollTo(0,0,500)

        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        if (-position.y > 1000) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*padding-bottom: 49px;*/
    height: 100vh;
    position: relative;
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

  .tab-control {
    /*position: sticky;*/
    top: 44px;
    z-index: 9;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
