<template>
  <div class="botton-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CarButtonBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return "￥" + this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=> item.checked).length
      }
    }
  }
</script>

<style scoped>
  .botton-bar{
    display: flex;
    position: relative;
    background: #777777;
    height: 40px;
    color: #fff;
    line-height: 40px;
  }
  .check-content {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
    text-align: center;
  }
  .calculate{
    width: 90px;
    background: deeppink;
    text-align: center;
  }
</style>
