<template>

  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">

      <img :src="item" alt="" @load="imageLoad">

    </swiper-item>
  </swiper>

</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false,
      }
    },
    methods: {
      imageLoad() {
        //在这里判断，只需发送一次即可
        if (!this.isLoad) {
          this.$emit("swiperimageLoad")
          this.isLoad = true;
        }

        //也可以在Home.vue中使用修饰符 .once
        //   this.$emit("swiperimageLoad")
      },
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    width: 320px;
  }

  .detail-swiper img {
    height: auto;
    max-height: 100%;
    width: auto;
    max-width: 100%;
  }
</style>
