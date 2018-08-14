<template>
    <div class="lottery-page">
        <!-- 转盘抽奖页面 -->
        <!-- 活力值 -->
        <div class="hlz-box">
            活力值:{{hlz}}
        </div>
        <!-- 菜单按钮 -->
        <img src="../assets/images/menu.png" alt="" class="menu-btn" @click="toggleMenu">
        <!-- 抽奖转盘 -->
        <div class="lottery-box">
          <!-- 小绿人 -->
            <img src="../assets/images/xlr-02.png" alt="" class="lottery-xlr">
            <img src="../assets/images/pan.png" alt="" class="pan" v-bind:class="[isDraw?rotate:'init']">
            <img src="../assets/images/zhen.png" 
            alt="" 
            class="point"
            @click="lottery"
            >
        </div>
        <!-- 右下角 去兑换按钮 -->
        <div class="qdh-box" @click="navTojlb"></div>
        <!-- 菜单组件 -->
        <lvChaMenu
            :showMenu='showMenu' 
            @openHdgz="openHd"
            @navTogrzx="navTogrzx"
            @closeMenu="closeMenu"
        ></lvChaMenu>
        <!-- 活动规则 -->
        <hdgz v-if='hdgzState' @closeHdgz='toggleHdgz'></hdgz>
        <!-- 抽奖弹框 -->
        <lotteryModal 
        v-if="showlotteryModal" 
        :modalInfo="modalInfo"
        @closelotteryModal="closelotteryModal"
        ></lotteryModal>
    </div>
</template>
<script>
// var wx = require('weixin-js-sdk');
import lvChaMenu from "./lvChaMenu";
import hdgz from "./hdgz";
import lotteryModal from "./lotteryModal";
import url from "../../static/js/url.js";
export default {
  name: "lottery",
  components: { lvChaMenu, hdgz, lotteryModal },
  created(){
    //获取用户手机号 、渴望币
    this.getUserinfo()
  },
  data() {
    return {
        hlz:0,
        userPhone:'',
      showMenu: false,
      showHdgz: false,
      showlotteryModal: false,
      // 提示
      modalInfo: {
        type: "ts",
        context: "亲，活力值不足，无法参与抽奖"
      },
      //中奖 微信红包
      modalInfo: {
        type: "wx",
        context: "0.03"
      },
      //中奖 活力值
      modalInfo: {
        type: "hlz",
        context: "300"
      },
      //中奖 腾讯动漫
      modalInfo: {
        type: "txdm",
        context: ""
      },
      isDraw: false,
      rotate:'init',
    };
  },
  mounted(){
  },
  computed: {
    //获取活动规则状态
    hdgzState() {
      return this.$store.state.hdgzState;
    }
  },
  methods: {
    //获取用户手机号 、渴望币
    getUserinfo(){
        this.axios.get(url.getUserInfo).then((response) => {
            console.log("获取用户手机号 、渴望币 res -->",response)
            if(response.data.state == 'ok'){//
                localStorage.setItem('userPhone',response.data.phone);
                localStorage.setItem('hlz',response.data.rest_point);
                this.userPhone = response.data.phone
                this.hlz = response.data.rest_point
            }else{//
                console.log("获取用户手机号 、渴望币 失败")
            }
        }).catch((response)=>{
            console.log("获取用户手机号 、渴望币 err -->",response)
        })
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      this.showMenu = false;
    },
    toggleHdgz() {
      (this.showHdgz = !this.showHdgz), (this.showMenu = false);
    },
    openHd() {
      console.log("openHd");
      this.showHdgz = true;
    },
    //关闭菜单弹框
    CloseMenuModal() {
      this.showMenu = false;
    },
    // 跳转个人中心
    navTogrzx() {
      this.$router.push({ path: "grzx" });
    },
    // 去兑换 跳转 周边商城
    navTojlb(){
      this.$router.push({ path: "jlb" });
    },
    // 关闭抽奖弹框
    closelotteryModal() {
      this.showlotteryModal = false;
      this.isDraw = false;
    },
    //抽奖
    lottery() {
      let isDraw = this.isDraw;
      let hlz = this.hlz;

      if (isDraw) {
        return;
      }
      if (hlz < 100) {
        // alert("活力值不足");
        this.modalInfo={
                type: "ts",
                context: "活力值不足，无法参与抽奖"
            }
        this.showlotteryModal = true;
        return;
      }
      this.isDraw = true;
      console.log("抽奖");
      console.log(hlz);
      
    this.axios
        .get(url.lottery)
        .then(response => {
        console.log("抽奖 res -->", response);
        // alert("response.data.state",response.data.state)
        if (response.data.state == "ok") {
            //获取用户手机号 、渴望币
            this.getUserinfo()
            //
            let type = response.data.goodInfo.bak3;
            if (type == "HLZ") {
              var context = response.data.goodInfo.prizeName.replace(/[^\d.]/g,'')
              this.modalInfo = {
                  type: "hlz",
                  context: context
              };
              if(context == 50){
                this.rotate = 'hlz50'
              }
              if(context == 100){
                this.rotate = 'hlz100'
              }
              if(context == 200){
                this.rotate = 'hlz200'
              }
              if(context == 300){
                this.rotate = 'hlz300'
              }
            }
            if (type == "WXHB") {
              var context = response.data.goodInfo.prizeName.replace(/[^\d.]/g,'')
              this.modalInfo = {
                  type: "wx",
                  context: context
              };
              if(context == 0.3){
                this.rotate = 'wx3'
              }
              if(context == 0.68){
                this.rotate = 'wx68'
              }
              if(context == 8.8){
                this.rotate = 'wx88'
              }
            }
            if (type == "TXCDK") {
              this.modalInfo = {
                  type: "txdm",
                  context: ""
              };
              this.rotate = 'txdm'
            }
            setTimeout(()=>{
                this.showlotteryModal = true;
            },5000)
            setTimeout(()=>{
                // this.isDraw = false;
            },4000)
        } else {
            this.isDraw = false;
            // alert(response.data.info);
            this.modalInfo={
                type: "ts",
                context: response.data.info
            }
            this.showlotteryModal = true;
        }
        })
        .catch(response => {
        console.log("抽奖请求失败 -->", response);
        });
    },
    setIsDraw(){
      this.isDraw = false;
    }
  }
};
</script>

<style>
.lottery-page {
  width: 100%;
  height: 100%;
  min-height: 6.03rem;
  background: url(../assets/images/lottery-page-bg01.jpg) no-repeat;
  background-size: 100% 100%;
  background-color: #0d5526;
  position: relative;
  clear: both;
}
/* 活力值 */
.hlz-box {
  background: url(../assets/images/hlz_bg.png) no-repeat;
  background-size: 100%;
  background-position: center -0.15rem;
  color: #faffad;
  font-size: 18px;
  height: 0.51rem;
  text-align: center;
  padding-top: 0.06rem;
  box-sizing: border-box;
}

/* 抽奖转盘 */
.lottery-box {
  padding: 0 0.12rem;
  margin-top: 1.2rem;
  position: relative;
}
.pan {
  width: 3.52rem;
  animation-fill-mode: forwards;
}
.point {
  width: 1.72rem;
  position: absolute;
  left: 1.04rem;
  top: 0.8rem;
}
.xz {
  animation: myfirst 5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

.init{
  transform: rotate(0deg);
}

/* 8.8元 */
.wx88{
  transform: rotate(1080deg);
  transition: all 5s;
}
/* 0.68元 */
.wx68{
  transform: rotate(1170deg);
  transition: all 5s;
}
/* 0.3元 */
.wx3{
  transform: rotate(990deg);
  transition: all 5s;
}

/* 活力值200 */
.hlz200{
  transform: rotate(1125deg);
  transition: all 5s;
}
/* 活力值50 */
.hlz50{
  transform: rotate(1035deg);
  transition: all 5s;
}
/* 活力值100 */
.hlz100{
  transform: rotate(945deg);
  transition: all 5s;
}
/* 活力值300 */
.hlz300{
  transform: rotate(1215deg);
  transition: all 5s;
}
/* 腾讯动漫 */
.txdm{
  transform: rotate(1260deg);
  transition: all 5s;
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1440deg);
  }
}

/* 去兑换 */
.qdh-box{
    /* margin-top: 0.05rem; */
    width: 1rem;
    height: 0.8rem;
    /* background: rgba(0,0,0,0.9); */
    /* float: right; */
    position: absolute;
    bottom: 0;
    right: 0;
}

.lottery-xlr{
  position: absolute;
  width: 0.6rem;
  top: -1.2rem;
  left: 1rem;
}
</style>

