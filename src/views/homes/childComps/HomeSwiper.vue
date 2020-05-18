<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners"  :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem,
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false,
      }
    },
    methods:{
      imageLoad(){
        //在这里判断，只需发送一次即可
        if (!this.isLoad) {
          this.$emit("swiperimageLoad")
          this.isLoad=true;
        }

        //也可以在Home.vue中使用修饰符 .once
        //   this.$emit("swiperimageLoad")
      },
    }
  }
</script>

<style scoped>

</style>
