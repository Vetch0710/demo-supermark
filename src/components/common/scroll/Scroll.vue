<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh() {
        console.log("------")
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },

    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType, //实时监听
        pullUpLoad: this.pullUpLoad,  //监听是否滚动到最后
        mouseWheel: true,  //是否允许鼠标滑动
        click: true
      })
      //监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => { //定位当前浏览到的位置
          this.$emit('scroll', position)
        })
      }
      // console.log(this.scroll)
      //监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => { //上拉加载更多
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>

</style>
