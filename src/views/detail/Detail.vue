<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content"
            @scroll="contentScroll" :probe-type="3"
            ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <dedail-shop-info :shop="shop"></dedail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-common-info ref="comment" :commont-info="commontInfo"></detail-common-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

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
        recommends:[],
        themeTopYs:[],
        currentIndex:0,
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
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    mixins:[itemListenerMixin,backTopMixin],
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
        if (data.rate.cRate !== 0){
            this.commontInfo = data.rate.list[0]
        }
      })
      // 获取推荐更多
      getRecommend().then(res=>{
        this.recommends=res.data.list
      })
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgLiner)
    },
    methods:{
      imageLoad(){
        this.newRefresh
        // this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        const positionY = -position.y
        this.listenShowBackTop(position)
        let length = this.themeTopYs.length
        for (let i = 0 ; i < length-1 ; i++) {
          if (this.currentIndex !== i && (i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
            // console.log(this.$refs.nav.currentIndex)
          }
        }
      },
      addToCart(){
        // 获取购物车需要的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 添加到购物车里
        this.$store.dispatch("addCart",product)
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
    height: calc(100% - 103px);
    overflow: hidden;
  }
</style>
