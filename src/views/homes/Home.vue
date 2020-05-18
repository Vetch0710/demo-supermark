<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    />
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperimageLoad="swiperimageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"

      />
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
  import {debounce} from "common/utils"
  import {imgListenerMixin} from 'common/mixin'

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
    mixins: [imgListenerMixin],
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
        isShow: false,
        tabOffsetTop: 0,
        isTabFixed: 0,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      console.log("aaa")
      this.$refs.scroll.refresh()
      // this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.scroll.startY = this.saveY
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
      this.$bus.$off("itemImageLoad", this.imgListener)
    },
    created() {
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      // //3.监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 200)
      // this.$bus.$on("itemImageLoad", () => {
      //   refresh()
      // })
      //
      // //获取tabControl 的offsetTop
      // //所有的组件都有一个属性$el：用于获取组件中的元素
      // // console.log(this.$refs.tabControl.$el.offsetTop);

    },
    methods: {
      /**
       * 网络请求相关的方法
       * */
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
      /**
       * 事件监听相关的方法
       * */
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // 获取ref="scroll" 里的 scroll（scroll.vue中的数据） 属性
        // this.$refs.scroll.scroll.scrollTo(0,0,500)

        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        //返回顶部图标 是否显示
        if (-position.y > 1000) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }


        //tabcontrol 吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperimageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

      },
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*padding-bottom: 49px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }


  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
