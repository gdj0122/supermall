<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"></tab-menu>
      <scroll id="tab-content" ref="scroll">
        <div>
          <tab-control :titles="['流行','新款','精选']" >
          </tab-control>
          <goods-list :goods="showGoods"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import {getCategory} from "network/category";

  import {tabclickMixin} from 'common/mixin'

  export default {
    name: "Category",
    components:{
      TabMenu,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    data(){
        return {
          categories:[],
        }
      },
    created(){
      this.getCategory()
    },
    mixins:[tabclickMixin],
    methods:{
      getCategory(){
        getCategory().then(res=>{
          this.categories = res.data.category.list
        })
      }
      },
    computed:{
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
    }
    }
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: calc(100vh);
    overflow: hidden;
    flex: 1;
  }
</style>
