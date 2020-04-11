import {debounce} from "./utils";
import backTop from "components/content/backTop/backTop";

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
