<template>
    <div class="tar-bar-item" @click="Itemclick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TarBarItem",
        props:{
          path:String,
          activeColor:{
              type:String,
              default:"deepPink"
          }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle(){
                return this.isActive ? {color:this.activeColor} :{}
            }
        },
        methods:{
            Itemclick(){
                this.$router.replace(this.path)
            },
        }
    }
</script>

<style scoped>
  .tar-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    /*line-height: 49px;*/
    font-size: 14px;
  }
  .tar-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: deeppink;
  }
</style>
