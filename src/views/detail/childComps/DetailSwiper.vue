<template>
  <swiper class="detail-item">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" >
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '@/components/common/swiper'
  export default {
    name: "DetailSwiper",
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-item{
    height: 300px;
    /*overflow: hidden;*/
  }
  .detail-item .slide{
    height: 300px;
  }
  .detail-item img{
    height: 300px;
  }
</style>
