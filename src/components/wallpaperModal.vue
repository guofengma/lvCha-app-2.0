<template>
    <div class="modal-com wallpaperModal-com">
        <!-- 弹框 -->
        <div class="mask" @click="closewallpaperModal"></div>
        <div class="modal-box">
          <img src="../assets/images/xlr.png" alt="" class="xlr-icon">
          <!--<img src="../assets/images/bizhi.png" alt="" class="wallpaper-img">-->
          <img :src="wallpaperSrc" alt="" class="wallpaper-img">
          <!-- <div class="close-wallpaperModal-btn">X</div> -->
          <p class="modal-pic-hint">长按图片保存到本地相册</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"wallpaperModal",
  props:['wallpaperSrc'],
    data(){
        return{
            checked:true
        }
    },
    computed:{
        
    },
    methods:{
        //跳转个人中心
        navTogrzx(){
            console.log(this.$router)
            if(this.$route.name == 'grzx'){
                this.showMenu = false
            }
            this.$router.push({path:'grzx'})
        },
        //关闭弹框
        closewallpaperModal(){
            this.$emit('closewallpaperModal')
        }
    }
}
</script>
<style scoped>
.modal-box{
    font-size: 12px;
    width: 2.95rem;
    box-sizing: border-box;
    position: fixed;
    left: 0.4rem;
    top: 0.9rem;
    background: #69B603;
    background: -webkit-gradient(linear,0% 0%, 0% 100%, from(#69B603), to(#A1ED40), color-stop(0.0,#336600));
    /* height: 1rem; */
    border: 0.02rem solid #f2f1b4;
    border-radius: 0.1rem;
    padding: 0.2rem;
}

/* 壁纸 */
.wallpaper-img{
    width: 100%;
}

/* 关闭 */
.close-wallpaperModal-btn{
    width: 0.35rem;
    height: 0.35rem;
    position: absolute;
    right: -0.175rem;
    top: -0.175rem;
    box-sizing: border-box;
    border: 2px solid #f4edbc;
    border-radius: 50%;
}
.modal-pic-hint{
    color: #fff;
    text-align: center;
    /* margin-bottom: -0.1rem; */
    position: relative;
    transform: translateY(0.1rem)
}
</style>


