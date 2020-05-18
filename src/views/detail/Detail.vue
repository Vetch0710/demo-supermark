
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="GoodsInfo"/>
      <detail-shop-info :shop="Shop"/>
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramsInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommend"/>
    </scroll>
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
  // import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";


  import {getDetail, GoodsInfo, Shop, GoodsParams, getRecommend} from "network/detail";
  import {imgListenerMixin} from "common/mixin";


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
      // DetailBottomBar,
      GoodsList,
      Scroll
    },
    //混入
    mixins:[imgListenerMixin],
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
        itemImgListener:'',
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
      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      })
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.imgListener)
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh();
      }
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
    height: calc(100% - 44px);
  }
</style>
