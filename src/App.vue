<template>
  <div id="app">
      <keep-alive exclude="Detail">
        <router-view></router-view>
      </keep-alive>
    <Maintarbar></Maintarbar>
  </div>
</template>

<script>
import Maintarbar from "@/components/content/Maintarbar/Maintarbar";
export default {
  name: 'App',
  components: {
    Maintarbar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
