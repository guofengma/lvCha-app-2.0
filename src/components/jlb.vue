<template>
    <div class="jlb-com">
        <!-- 活力俱乐部 -->
        <!-- 活力值 -->
        <div class="hlz-box">
            活力值:{{hlz}}
        </div>
        <!-- 菜单按钮 -->
        <img src="../assets/images/menu.png" alt="" class="menu-btn">
        <!-- 头部 含背景 -->
        <div class="jlb-head">
            <div class="jlb-nav" 
            :class="index == currNvaIndex?'active':''" 
            v-for="(item,index) in navList" 
            :key="index"
            @click="toggleNav(index)"
            >
                {{item.name}}
            </div>
        </div>
        <!-- 内容区域 商品列表 -->
        <div class="jlb-con">
            <div class="jlb-list" v-if="currNvaIndex == 0">
                <div class="jlb-item" v-for="(e,i) in perimeterList" :key="i">
                    <div class="img-box">
                        <img src="../assets/images/jp.jpg" alt="" class="jlb-img">
                    </div>
                    <div class="item-info">
                        <p class="item-name">{{e.prizeName}}</p>
                        <div class="dh" @click="sureDh(e)">{{e.dhUse}}活力值兑换</div>
                        <span class="stock">今日限额{{e.bak1}}件</span>
                    </div>
                </div>
            </div>
            <!-- 壁纸专区 -->
            <div class="jlb-list bz-list" v-if="currNvaIndex == 1">
                <div class="half-item" v-for="(e,i) in wallpaperList" :key="i">
                    <div class="pro-img-box">
                        <img src="../assets/images/jp.jpg" alt="" class="pro-img">
                    </div>
                    <div class="pro-info">
                        <p class="pro-name">{{e.prizeName}}</p>
                        <div class="dh-btn" @click="sureDh(e)">{{e.dhUse}}活力值兑换</div>
                    </div>
                    <!-- <span class="bz-stock">今日限额{{e.bak1}}件</span> -->
                </div>
                <div class="itemempty" v-if="wallpaperList.length%2"></div>
            </div>
        </div>
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
        <!-- 兑换提示 和 结果弹框 -->
        <dhModal 
        v-if="showDhmodal" 
        :modalInfo="modalInfo" 
        @closeDhModal="closeDhModal"
        @goodsExchange="goodsExchange"
        ></dhModal>
        <dhModal 
        v-if="showDhmodalT" 
        :modalInfo="modalInfo" 
        @closeDhModalT="closeDhModalT"
        ></dhModal>
    </div>
</template>
<script>
import modal from "./modal";
import lvChaMenu from "./lvChaMenu";
import url from "../../static/js/url.js";
import hdgz from "./hdgz";
import dhModal from "./dhModal";
import dhModalT from "./dhModalT";
export default {
  name: "jlb",
  components: { modal, lvChaMenu, hdgz, dhModal,dhModalT },
  data() {
    return {
      userPhone:'',
      hlz:'',
      showDhmodal: false,
      showDhmodalT:false,
      //弹框参数
      modalInfo: {
        title: "温馨提示",
        num: 700,
        type: "sureDh",
        id: "",
      },
      showModal: false,
      showHdgz: false,
      showMenu: false,
      navList: [
        {
          name: "周边专区"
        },
        {
          name: "壁纸专区"
        }
      ],
      currNvaIndex: 1,
      //周边专区
      perimeterList: [
        {
          dhUse: 3500,
          id: 9,
          imageUrl: "..../assets/images/page_1.png",
          prizeName: "腾讯动漫IP与一心两叶双肩包",
          num: 0,
          type: "DH",
          bak1: 10 //今日限额字段
        }
      ],
      //壁纸专区
      wallpaperList: [
        {
          dhUse: 100,
          id: 14,
          imageUrl: "",
          prizeName: "（多张）合作Ipx康师傅绿茶定制壁纸",
          num: 0,
          type: "DH",
          bak1: 10 //今日限额字段
        }
      ]
    };
  },
  created() {
    // 获取周边商品列表
    this.getGoodsList();
    //获取用户手机号 、渴望币
    this.getUserinfo()
  },
    computed: {
    //获取活动规则状态
    hdgzState() {
      return this.$store.state.hdgzState;
    }
  },
  methods: {
    closeDhModal(){
      this.showDhmodal = false;
    },
    closeDhModalT(){
      this.showDhmodalT = false;
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
    // 切换分类
    toggleNav(index) {
      console.log(index);
      this.currNvaIndex = index;
    },
    //关闭菜单弹框
    CloseMenuModal() {
      this.showMenu = false;
    },
    navTogrzx() {
      console.log(this.$router);
      if (this.$route.name == "grzx") {
        this.showMenu = false;
      }
      this.$router.push({ path: "grzx" });
    },
    // 获取周边商品列表
    getGoodsList() {
      this.axios
        .get(url.getGoodsList)
        .then(response => {
          console.log("获取周边商品列表 res -->", response);
          if (response.data.state == "ok") {
            //
            this.perimeterList = response.data.perimeterList;
            this.wallpaperList = response.data.wallpaperList;
          } else {
            //
          }
        })
        .catch(response => {
          console.log("请求失败 -->", response);
        });
    },
    // 确认兑换
    sureDh(e) {
      if(e.dhUse > this.hlz){
        console.log('>')
        this.modalInfo = {
          title: "温馨提示",
          num: e.dhUse,
          type: "ts",
          content:"活力值不足，无法兑换该商品",
          prizeName:e.prizeName,
          id: e.id,
        };
        this.showDhmodal = true
        return
      }
      this.modalInfo = {
        title: "温馨提示",
        num: e.dhUse,
        type: "sureDh",
        prizeName:e.prizeName,
        id: e.id,
      };
      this.showDhmodal = true
    },
    // 商品兑换
    goodsExchange(goodInfo) {
      this.showDhmodal = false
      let reqData = {
        goodsId: goodInfo.id
      };
      this.axios
        .get(url.exChange, { params: reqData })
        .then(response => {
          console.log("商品兑换 res -->", response);
          console.log('response.data.state == "ok"',response.data.state == "ok")
          if (response.data.state == "ok") {
            //
            
            this.modalInfo = {
              title: "恭喜您获得",
              num: e.dhUse,
              type: "dhsuc",
              id: e.id,
              content:goodInfo.prizeName
            };
            this.showDhmodal = false
            this.showDhmodalT = true
            // alert('兑换成功')
            //获取用户手机号 、渴望币
            this.getUserinfo()
          } else {
            
            this.modalInfo = {
              title: "温馨提示",
              num: e.dhUse,
              type: "dherr",
              id: e.id,
              content:response.data.info
            };
            this.showDhmodal = false
            this.showDhmodalT = true
            
            // alert(response.data.info)
          }
        })
        .catch(response => {
          console.log("商品兑换 请求失败 -->", response);
          // alert('请求失败')
            // this.showDhmodal = false
        });
    },
    //获取用户手机号 、渴望币
    getUserinfo(){
        this.axios.get(url.getUserInfo,).then((response) => {
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
  }
};
</script>
<style>
.jlb-com {
  min-height: 100%;
  background: url(../assets/images/bg_03.jpg) no-repeat;
  background-size: 100%;
  background-color: #4ca537;
  font-size: 0;
  padding-bottom: 0.2rem;
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
/* 菜单按钮 */
.menu-btn {
  position: absolute;
  width: 0.315rem;
  right: 0.2rem;
  top: 0.2rem;
  cursor: pointer;
}
/* 头部 */
.jlb-head {
  background: url(../assets/images/jld-hd-bg.png) no-repeat;
  background-size: 100%;
  height: 2.14rem;
  margin-top: -0.51rem;
  box-sizing: border-box;
  padding: 1.5rem 0.1rem 0 0.1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
/* 头部分类按钮 */
.jlb-nav {
  width: 1.525rem;
  height: 0.44rem;
  background: url(../assets/images/nav-btn.png) no-repeat;
  background-size: 100%;
  background-position: center bottom;
  font-size: 12px;
  color: #007e41;
  font-weight: 600;
  padding: 0 0.2rem 0.1rem 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

.jlb-nav.active {
  background: url(../assets/images/nav-btn-act.png) no-repeat;
  background-size: 100%;
  background-position: center bottom;
}
/* 内容区域 商品列表 */
.jlb-con {
  width: 3.37rem;
  margin: 0 auto;
  background: url(../assets/images/con_bg.jpg) repeat-y;
  background-size: 100%;
  padding: 0 0.04rem;
  box-sizing: border-box;
  transform: translateX(-0.01rem);
  padding-bottom: 0.06rem;
  border-bottom-left-radius: 0.08rem;
  border-bottom-right-radius: 0.08rem;
}
.jlb-list {
  background: #92d92c;
  padding-bottom: 0.2rem;
  border-bottom-left-radius: 0.08rem;
  border-bottom-right-radius: 0.08rem;
}

/* 单个商品 */
.jlb-item {
  width: 3.25rem;
  height: 1.07rem;
  box-sizing: border-box;
  background: url(../assets/images/item-bg.png) no-repeat;
  background-size: 100%;
  padding: 0.16rem 0.22rem 0.16rem 0.24rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.img-box {
  width: 0.71rem;
  height: 0.71rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jlb-img {
  max-width: 100%;
  max-height: 100%;
}
.item-info {
  width: calc(100% - 0.8rem);
  font-size: 12px;
  color: #fff;
  box-sizing: border-box;
  padding-left: 0.1rem;
  padding-right: 0.4rem;
}

.item-name{
  height: 0.32rem;
}
/* 兑换按钮 */
.dh {
  margin-top: 0.18rem;
  box-sizing: border-box;
  /* padding-left: 0.01rem; */
  /* background: url(../assets/images/dh-btn-bg.png) no-repeat; */
  /* background-size: 100%; */
  background-color: #f19034;
  /* width: 0.9rem; */
  /* height: 0.215rem; */
  font-size: 12px;
  display: inline-block;
  padding: 0.04rem 0.08rem;
  padding-bottom: 0.06rem;
  border-radius: 0.1rem;
}
/* 库存 */
.stock {
  position: absolute;
  transform: rotate(34deg) scale(0.8);
  width: 1rem;
  text-align: center;
  right: 0;
  top: 0.16rem;
  box-sizing: border-box;
  padding-left: 0.08rem;
}

/* 壁纸专区 */
.bz-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.half-item {
  width: 1.55rem;
  height: 1.7rem;
  background: url(../assets/images/bz-bg.png) no-repeat;
  background-size: 100%;
  margin-bottom: 0.05rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.bz-stock{
  position: absolute;
  transform: rotate(34deg) scale(0.8);
  width: 1.6rem;
  text-align: center;
  right: -0.4rem;
  top:0.1rem;
  box-sizing: border-box;
  padding-left: 0.08rem;
  font-size: 12px;
  background: #016c37;
  color: #fff;
  height: 0.2rem;
  line-height: 0.2rem;
}
/* .bz-list .half-item:last-child{
    align-self:baseline;
} */
/* .bz-list:after {
    content: "";
    flex: auto;
 } */

.itemempty {
  width: 1.55rem;
  height: 1.7rem;
}

.pro-img-box {
  height: 1rem;
  box-sizing: border-box;
  padding: 0.1rem;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pro-img {
  max-width: 100%;
  max-height: 100%;
}

.pro-info {
  box-sizing: border-box;
  padding: 0.04rem 0;
  color: #fff;
}

.pro-name {
  font-size: 12px;
  transform: scale(0.9);
  height:0.29rem;
}

.dh-btn {
  box-sizing: border-box;
  font-size: 10px;
  background-color: #f19034;
  padding: 0.02rem 0;
  padding-bottom: 0.04rem;
  border-radius: 0.06rem;
  width: 1.1rem;
  margin: 0 auto;
  text-align: center;
}
</style>


