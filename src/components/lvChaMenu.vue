<template>
    <div class="menu-com">
        <div v-if="showMenu == true" class="mask menu-mask"
            @click="closeMenu"
        ></div>
        <div v-if="showMenu == true" class="menu-box modal-box">
            <img v-for="(item,index) in menuList" 
            v-bind:key="index" 
            v-bind:src="item.img" alt="" 
            class="menu-item"
            @click="menuHandle(item.ev,item)"
            >
            <!-- 左上角小绿人图标 -->
            <img src="../assets/images/xlr.png" alt="" class="xlr-icon">
             <!-- 左树叶 -->
            <img src="../assets/images/leaf-l.png" alt="" class="leaf-icon leaf-l">
            <!-- 右树叶 -->
            <img src="../assets/images/leaf-r.png" alt="" class="leaf-icon leaf-r">
        </div>
    </div>
</template>
<script>
export default {
    name:"lvChaMenu",
    props:['showMenu'],
    data(){
        return{
            menuList:[
                {
                    img:'./static/images/menu-hlz.png',
                    ev:'whd'
                },
                {
                    img:'./static/images/menu-jlb.png',
                    ev:'navTolottery'
                },
                {
                    img:'./static/images/menu-gezx.png',
                    ev:'navTogrzx'
                },
                {
                    img:'./static/images/menu-hdgz.png',
                    ev:'hdgz',
                },
            ]
        }
    },
    methods:{
        menuHandle(ev,item){
            if(item.ev == 'whd'){
                window.location.href = 'http://yxly.ksf.com.cn/html/index.html';
            }
            if(item.ev == 'hdgz'){
                console.log('dasd')
                //显示活动规则
                this.$store.commit('showHdgz')
                return
            }
            if(item.ev == 'navTogrzx'){
                this.navTogrzx()
            }
            if(item.ev == 'navTolottery'){
                this.navTolottery()
            }
            
            // console.log(ev)
            // this.$emit(ev)
        },
        // 跳转个人中心
        navTogrzx() {
            this.$router.push({ path: "grzx" });
            if(this.$route.name == 'grzx'){
                this.closeMenu()
            }
        },
        // 跳转个人中心
        navTolottery() {
            this.$router.push({ path: "lottery" });
            if(this.$route.name == 'lottery'){
                this.closeMenu()
            }
        },
        closeMenu(){
            this.$emit('closeMenu')
        },
        
    }
}
</script>
<style>

.menu-com{
    font-size: 24px;
}

.menu-box{
    /* top: 1.43rem; */
    padding-top: 0.5rem;
    padding-bottom: 0.4rem;
}

.menu-item{
    width: 2.50rem;
    margin-bottom: 0.05rem;
    cursor: pointer;
}

.xlr-icon{
    position: absolute;
    left: -0.21rem;
    top: -0.6rem;
    width: 0.82rem;
}
.leaf-l{
    left: -0.15rem;
    bottom: 30%;
}
</style>
