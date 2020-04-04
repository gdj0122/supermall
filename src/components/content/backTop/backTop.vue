<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "backTop",
    methods:{
      backClick(){
        this.$emit("backClick")
      }
    }
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 3px;
    bottom: 49px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
