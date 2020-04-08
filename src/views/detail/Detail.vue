<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <dedail-shop-info :shop="shop"></dedail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DedailShopInfo from "./childComps/DedailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail,Goods,Shop} from "network/detail";
  export default {
    name: "Detail",
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DedailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res=>{
        const data = res.result
        // console.log(res)
        // 1.获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 保存商品的详情信息
        this.detailInfo = data.detailInfo
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
