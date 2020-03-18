<template>
  <div class="cart">
    <!-- 导航栏 -->
      <nav-bar  class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>

      <!-- 商品列表 -->
        <cart-list/>
      <!-- 底部导航栏 -->

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'

import {mapGetters} from 'vuex'

export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList
    },
    computed: {
      // 两种用法
      // ...mapGetters([
        // 'cartListLength',
        // 'cartList'
      // ])
      ...mapGetters({
        length: 'cartListLength',
        list: 'cartList'
      })
    }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>