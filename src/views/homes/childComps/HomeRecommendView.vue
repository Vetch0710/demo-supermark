<template>
<div class="recommend">
  <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>

    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      recommends:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
 .recommend{
   display: flex;
   text-align: center;
   font-size: 12px;
   padding: 10px 0 10px 0 ;
   border-bottom: 5px solid #eee;
 }
  .recommend-item{
    flex: 1;

  }
 .recommend-item img{
    flex: 1;
   width: 65px;
   height: 65px;
   margin-bottom: 10px;
  }
</style>
