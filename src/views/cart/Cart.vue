<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <car-button-bar></car-button-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CarButtonBar from "./childComps/CarButtonBar";
  import {mapGetters} from 'vuex'
    export default {
      name: "Cart",
      components:{
        NavBar,
        CartList,
        CarButtonBar
      },
      computed:{
        ...mapGetters({
          length:"CartLength"
        })
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    position: relative;
    background: var(--color-tint);
    color: #fff;
  }
</style>
