import {debounce} from "./utils";
import backTop from "components/content/backTop/backTop";
import {getHomeGoods} from "@/network/home";

export const itemListenerMixin = {
  data(){
    return {
      itemImgLiner:null,
      newRefresh:null
    }
  },
  mounted () {
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgLiner = () =>{
      this.newRefresh
    }
    this.$bus.$on('itemImageLoad',this.itemImgLiner)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop:false
    };
  },
  components:{
    backTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = position.y < -1000
    }
  }
}

export const tabclickMixin = {
  data(){
    return {
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:"pop",
      isTabFixed:false,
    }
  },
  created(){
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },
  methods: {
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType="pop"
          break
        case  1:
          this.currentType="new"
          break
        case 2:
          this.currentType="sell"
          break
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
        // 完成加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
