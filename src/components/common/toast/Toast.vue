<template>
  <div class="toast" v-show="isShow">
    <div>{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        msg:"",
        isShow:false
      }
    },
    methods:{
      show(msg,dauation=2000){
        this.isShow = true
        this.msg = msg
        setTimeout(() => {
          this.isShow = false
          this.msg = ''
        },dauation)
      }
    }
  }
</script>

<style scoped>
.toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  background:rgba(0,0,0,.7);
  padding: 8px 10px;
  z-index: 12;
}
</style>
