<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'
  import {mapGetters} from 'vuex'

	export default {
		name: "Cart",
    components: {
		  NavBar,
      CartList,
      BottomBar
    },
    computed: {
		  //将vuex中的getters 映射到局部计算属性 以下代码效果一样
		  ...mapGetters([
        'cartCount',
        'cartList'
      ]),
      // ...mapGetters({
      //   cartCount:'cartCount',
      //   cartList:'cartList',
      // }),
		  // cartList() {
		  //   return this.$store.getters.cartList
      // },
      // cartCount() {
		  //   return this.$store.getters.cartCount
      // }
    }
	}
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
    /*background-color: #ffffff;*/
    /*position: relative;*/
    /*z-index: 9;*/

  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 93px;
    width: 100%;
    overflow: hidden;
  }
</style>
