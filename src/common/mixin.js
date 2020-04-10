import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgLiner:null
    }
  },
  mounted () {
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgLiner = () =>{
      newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgLiner)
    console.log("混入")
  }
}
