<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="detailNav"/>
    <scroll class="content" ref="scroll"
            @scroll="controlScroll"
            :probeType="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="GoodsInfo"/>
      <detail-shop-info :shop="Shop"/>
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"/>
    <detail-bottom-bar  @addToCart="addToCart" />
  </div>
</template>

<script>


  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailImagesInfo from "./childComps/DetailImagesInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";


  import {getDetail, GoodsInfo, Shop, GoodsParams, getRecommend} from "network/detail";
  import {imgListenerMixin, backTopMixin} from "common/mixin";
  import {debounce} from "../../common/utils";


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    //混入
    mixins: [imgListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        GoodsInfo: {},
        Shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopY: [],
        getThemeTop: null,
        currentIndex: 0,
      }
    },
    created() {
      //获取id
      this.iid = this.$route.params.iid

      //请求详细信息
      getDetail(this.iid).then(res => {
        let data = res.result
        //轮播图
        this.topImages = data.itemInfo.topImages
        //商品信息
        this.GoodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //店铺信息
        this.Shop = new Shop(data.shopInfo)
        //商品详细信息
        this.detailInfo = data.detailInfo;
        //参数的信息
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
        //当渲染完后回调函数，但是图片不一定加载完
        // this.$nextTick(() => {
        //   this.themeTopY = []
        //   this.themeTopY.push(0)
        //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopY)
        // })

      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      })

      this.getThemeTop = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);
        console.log(this.themeTopY);
      })

    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.imgListener)
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTop()
      },
      titleClick(index) {
        console.log(index)
        console.log(-this.themeTopY[index])
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
        // this.$refs.scroll.scroll.startY = -this.themeTopY[index]
      },
      controlScroll(position) {
        // console.log(position)
        const positionY = -position.y
        for (let i in this.themeTopY) {
          let index = parseInt(i)
          // let index = Number(i)
          if (this.currentIndex !== index && (positionY >= this.themeTopY[index]) && (positionY <= this.themeTopY[index + 1])) {

            this.currentIndex = index;
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
        this.isshow(position)

      },
      // ishow() {
      //   //返回顶部图标是否显示
      //   if (-position.y > 1000) {
      //     this.isShow = true;
      //   } else {
      //     this.isShow = false;
      //   }
      // },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.GoodsInfo.title
        obj.desc = this.GoodsInfo.desc;
        obj.newPrice = this.GoodsInfo.realPrice;
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj)
      },
    }
  }
</script>

<style scoped>
  #detail {
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;

  }

  .content {
    height: calc(100% - 94px);
  }
</style>
