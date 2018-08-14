<template>
    <div class="grzx-com">
        <div class="head">
            <img src="../assets/images/head-bg.jpg" alt="" class="head-img">
            <div class="hlz">活力值:{{hlz}}</div>
        </div>
        <!-- 手机号 -->
        <div class="phone-box">
            <span>手机号码:{{userPhone}}</span>
            <img src="../assets/images/phone-sy.png" alt="" class="ljsy" @click="navTolottery">
        </div>
        <!-- 奖品列表 -->
        <div class="prixe-box">
            <div class="prize-tit">我的中奖记录>></div>
            <div class="prize-con">
                <div class="prize-item" v-for="(item,index) in jpList" :key="index">
                    <div class="prize-img-box">
                        <img v-bind:src="item.goodsImage" alt="" class="prize-img">
                    </div>
                    <div class="prize-info">
                        <p class="prize-name">{{item.prizeName}}</p>
                        <div class="prize-other">
                            <span class="time">{{item.createTime.split(' ')[0]}}</span>
                            <span class="prize-handle-btn" v-if="item.bak1" @click="getTxdmlb(item)">立即领取</span>
                            <span class="prize-handle-btn" v-if="item.prizeType == 'BZ'" @click="getWallpaper(item)">立即查看</span>
                            <span class="prize-handle-btn" v-if="item.prizeType == 'SW'" @click="getSw(item)">{{is_filled_address == '1'?'立即查看':'完善地址'}}</span>
                        </div>
                    </div>
                </div>
                <!-- 暂无数据 -->
                <div class="noData" v-if="jpList.length == 0">暂无数据</div>
            </div>
        </div>
        <!-- 弹框 -->
        <modal v-if="showModal" @closeModal="closeModal"></modal>
        <!-- 菜单按钮 -->
        <img src="../assets/images/menu.png" alt="" class="menu-btn" @click="toggleMenu">
         <!-- 菜单组件 -->
        <lvChaMenu 
            :showMenu='showMenu' 
            @openHdgz="openHd"
            @navTogrzx="navTogrzx"
            @closeMenu="closeMenu"
        ></lvChaMenu>
        <!-- 活动规则 -->
        <hdgz v-if='hdgzState' @closeHdgz='toggleHdgz'></hdgz>
        <!-- 用户地址弹框 -->
        <userInfoModal 
            v-if="showUserInfoModal"
            :modalInfo="modalInfo"
            @closeUserInfoModal='closeUserInfoModal' 
            @getPrizeList="getPrizeList"
            @openModal="openModal"
        ></userInfoModal>
        <!-- 查看壁纸弹框 -->
        <wallpaperModal 
            v-if="showWallpaperModal" 
            @closewallpaperModal="closewallpaperModal"
            :wallpaperSrc="wallpaperSrc"
        ></wallpaperModal>
    </div>
</template>
<script>
    import modal from "./modal"
    import lvChaMenu from './lvChaMenu'
    import url from '../../static/js/url.js'
    import hdgz from './hdgz'
    import userInfoModal from './userInfoModal'
    import wallpaperModal from './wallpaperModal'
export default {
    name:"grzx",
    components:{modal,lvChaMenu,hdgz,userInfoModal,wallpaperModal},
    data(){
        return{
            hlz:0,
            userPhone:'',
            //壁纸src
            wallpaperSrc:"",
            //查看壁纸弹框
            showWallpaperModal:false,
            //地址信息弹框参数
            modalInfo:{
                type:'input',   //ouput
                id:0,
            },
            jpList:[
                {
                    prizeName:'动漫看番100点券',
                    createTime:'2018-09-28 13:15:45',
                }
            ],
            showUserInfoModal:false,
            showModal:false,
            showHdgz:false,
            showMenu:false,
            // 是否绑定地址
            is_filled_address:'',
        }
    },
    created(){
         //获取中奖记录
        this.getPrizeList()
        //获取用户手机号 、渴望币
        this.getUserinfo()
    },
    computed:{
        hdgzState(){
            return this.$store.state.hdgzState
        }
    },
    methods:{
        toggleMenu(){
            this.showMenu = !this.showMenu
        },
        closeMenu(){
            this.showMenu = false
        },
        toggleHdgz(){
            this.showHdgz = !this.showHdgz,
            this.showMenu = false

        },
        openHd(){
            console.log("openHd")
            this.showHdgz = true
        },
        //关闭菜单弹框
        CloseMenuModal(){
            this.showMenu = false
        },
        closeModal(){
            this.showModal = false
        },
        openModal(){
            this.showModal = true
        },
        navTogrzx(){
            console.log(this.$router)
            if(this.$route.name == 'grzx'){
                this.showMenu = false
            }
            this.$router.push({path:'grzx'})
        },
        //跳转转盘抽奖
        navTolottery(){
            this.$router.push({path:'lottery'})
        },
        //获取中奖记录
        getPrizeList(){
            this.axios.get(url.prizeList).then((response) => {
                console.log("获取中奖记录 -->",response)
                if(response.data.state == 'ok'){
                   this.jpList = response.data.lotteryRecordList
                   this.is_filled_address = response.data.is_filled_address
                }else{//获取失败
                    
                }
            }).catch((response)=>{
                console.log("请求失败 -->",response)
            })
        },
        //领取腾讯动漫礼包
        getTxdmlb(item){
            console.log(item)
            let cdk = item.bak1;
            let id = item.id;
            this.axios.get(url.getTXdq,{params:{'cdk':cdk,'id':id}}).then((response) => {
                console.log("领取腾讯动漫礼包 res -->",response)
                // console.log("领取腾讯动漫礼包 res -->",response.data)
                if(response.data.code == 200){
                   window.location.href = response.data.data
                }else{//获取失败
                    
                }
            }).catch((response)=>{
                console.log("请求失败 -->",response)
            })
        },
        //关闭地址信息弹框
        closeUserInfoModal(){
            this.showUserInfoModal = false
        },
        //关闭壁纸弹框
        closewallpaperModal(){
            this.showWallpaperModal = false
        },
        //获取用户手机号 、渴望币
        getUserinfo(){
            this.axios.get(url.getUserInfo,).then((response) => {
                console.log("获取用户手机号 、渴望币 res -->",response)
                if(response.data.state == 'ok'){//
                    this.userPhone = response.data.phone
                    this.hlz = response.data.rest_point
                    localStorage.setItem('userPhone',response.data.phone);
                    localStorage.setItem('hlz',response.data.rest_point);
                }else{//
                    console.log("获取用户手机号 、渴望币 失败")
                }
            }).catch((response)=>{
                console.log("获取用户手机号 、渴望币 err -->",response)
            })
        },
        //点击查看壁纸
        getWallpaper(item){
            this.wallpaperSrc = item.goodsImage
            this.showWallpaperModal = true
        },
        //获取实物奖品
        getSw(item){
            let is_filled_address = this.is_filled_address
            //未绑定地址
            if(is_filled_address == 0){
                this.modalInfo = {
                    type:'input',
                    id:this.jpList[0].registerId
                }
            }else{
                 this.modalInfo = {
                    type:'output',
                    id:this.jpList[0].registerId
                }
            }
            this.showUserInfoModal = true
        },
    }

}
</script>

<style>
    .grzx-com{
        min-height: 100%;
    }
    .head{
        height: 0.96rem;
        font-size: 0;
        position: relative;
        overflow: hidden;
    }
    .head-img{
        width: 100%;
    }
    .hlz{
        position: absolute;
        color: #007e41;
        font-size: 16px;
        bottom: 0.1rem;
        left: 0.1rem;
        font-weight: 600;
        margin-left: 0.1rem;
    }
    .phone-box{
        height: 0.36rem;
        background: #027e43;
        display: flex;
        padding: 0 0.2rem;
        align-items: center;
        font-size: 12px;
        color: #fff;
        justify-content: space-between;
    }
    .ljsy{
        width: 1.13rem;
    }

    /* 奖品列表 */
    .prixe-box{
        background: url(../assets/images/bg_03.jpg) no-repeat;
        background-size: 100%;
        background-position: center -0rem;
        font-size: 0;
        padding-bottom: 0.2rem;
        background-color: #4ca537;
        min-height:calc(100vh - 1.32rem);
        box-sizing: border-box;
    }

    /* 我的中奖记录 */
    .prize-tit{
        font-size: 18px;
        color: #137349;
        font-weight: 900;
        text-align: center;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .prize-con{

    }
    .prize-item{
        background: url(../assets/images/pri-bg.png) no-repeat;
        background-size: 100%;
        width: 3.175rem;
        height: 1rem;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0.09rem 0.16rem 0.2rem 0.16rem;
        display: flex;
        justify-content: space-between;
    }
    .prize-img-box{
        width: 0.71rem;
        height: 0.71rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .prize-img{
        max-width: 100%;
        max-width: 100%;
    }
    .prize-info{
        width: calc(100% - 0.8rem);
    }
    .prize-name{
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        text-align: left;
        height: 0.46rem;
        box-sizing: border-box;
        padding-left: 0.06rem;
        overflow: hidden;
    }
    .prize-other{
        display: flex;
        font-size: 14px;
        color: #fff;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.06rem;
    }
    /* 按钮 */
    .prize-handle-btn{
        background: url(../assets/images/jp-btn-bg.png) no-repeat;
        background-size: 100%;
        width: 0.8rem;
        height: 0.25rem;
        font-size: 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

