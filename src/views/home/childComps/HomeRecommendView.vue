<template>
  <div class="recommend">
    <div v-for="item in recomends" class="item">
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
      recomends:{
        type:Array,
        default(){
          return []
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
    padding: 10px 0 20px;
    border-bottom: 8px solid #eeeeee;
  }
  .recommend .item{
    flex: 1;
  }
  .recommend .item img{
    width: 69px;
    height: 69px;
    margin-bottom: 10px;
  }
</style>
