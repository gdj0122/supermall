<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <dedail-shop-info :shop="shop"></dedail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-common-info :commont-info="commontInfo"></detail-common-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DedailShopInfo from "./childComps/DedailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommonInfo from "./childComps/DetailCommonInfo";

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Detail",
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commontInfo:{},
        recommends:[]
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DedailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommonInfo,
      Scroll,
      GoodsList
    },
    mixins:[itemListenerMixin],
    created() {
      // 获取iid
      this.iid = this.$route.params.iid
      // 获取详情数据
      getDetail(this.iid).then(res=>{
        const data = res.result
        console.log(res)
        // 1.获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 保存商品的详情信息
        this.detailInfo = data.detailInfo
        // 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if (data.rate.list !== 0){
          this.commontInfo = data.rate.list[0]
        }
      })
      // 获取推荐更多
      getRecommend().then(res=>{
        console.log(res.data.list)
        this.recommends=res.data.list
      })
    },
    destroyed(){
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
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
