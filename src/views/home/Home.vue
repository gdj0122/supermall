<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="TabControl1" v-show="isTabFixed"
    ></tab-control>
    <scroll class="content"
            ref="scroll" :probe-type="3"
            @scroll="contenScroll" :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad">
      </home-swiper>
      <home-recommend-view :recomends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="TabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import backTop from "components/content/backTop/backTop";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin,tabclickMixin} from "common/mixin";
  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        taboffsetTop:0,
        saveY:0,
        itemImgLiner:null
      }
    },
    components:{
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin,backTopMixin,tabclickMixin],
    created() {
      // 请求多个数据
      this.getHomeMultidata()
      // 请求商品数据

    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      // 保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgLiner)
    },
    methods:{
      // 刷新频繁防抖函数处理
      // 事件监听相关的方法

      contenScroll(position){
        // 1.判断backTop是否显示
        this.listenShowBackTop(position)
        // 2.决定tabcontrol是否吸顶
        this.isTabFixed = position.y < -this.taboffsetTop
      },
      // 获取TabControl的offsetTop
      // 所有组件都有一个属性$el:用于获取组件中的元素
      swiperImageLoad(){
        this.taboffsetTop = this.$refs.TabControl2.$el.offsetTop
      },
      // 下拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      // 网络请求相关的方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    z-index: 2;
  }
  .tab-control{
    position: relative;
    z-index: 6;
  }
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 66px;
    left: 0;
    right: 0;
  }
</style>
