import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const imgListenerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null
    };
  },
  mounted() {
    // 给防抖函数赋值一个新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.imgListener);
  }
};

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      // 当前滚动的位置
      curPosition: 0,
      isShow:false,
    };
  },
  methods: {
    // 回到顶部
    backTop() {
      // 调用子组件里面封装的scrollTo方法即可
      this.$refs.scroll.scrollTo(0, 0);
    },
    isshow(position) {
      //返回顶部图标是否显示
      if (-position.y > 1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },

};
