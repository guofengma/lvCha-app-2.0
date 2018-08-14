<template>
    <div class="modal-com lotteryModal-com">
        <!-- 弹框 -->
        <div class="mask"></div>
        <div class="modal-box">
            <!-- 标题 -->
            <div class="modal-tit" v-if="modalInfo.type == 'ts'">温馨提示</div>
            <div class="modal-tit" v-else>恭喜您获得</div>
            <!-- 内容区域 -->
            <div class="modal-con-box">
                <!-- 提示 -->
                <div class="modal-con" v-if="modalInfo.type == 'ts'">
                    <div class="no-hlz" >{{modalInfo.context}}</div>
                </div>
                <!-- 微信红包 -->
                <div class="modal-con " v-if="modalInfo.type == 'wx'">
                    <div class="prize-box hb-box">
                        <span class="prize-num">￥{{modalInfo.context}}</span>
                    </div>
                    <p class="prize-desc">{{modalInfo.context}}元微信红包</p>
                </div>
                <!-- 腾讯动漫 -->
                <div class="modal-con " v-if="modalInfo.type == 'txdm'">
                    <div class="prize-box txdm-box">
                    </div>
                    <p class="prize-desc">腾讯动漫阅点礼包</p>
                </div>
                <!-- 活力值 -->
                <div class="modal-con " v-if="modalInfo.type == 'hlz'">
                    <div class="prize-box hdhlz-box">
                        <span class="prize-num">{{modalInfo.context}}</span>
                    </div>
                    <p class="prize-desc">{{modalInfo.context}}活力值</p>
                </div>
                
            </div>
            <div class="modal-hint" v-if="modalInfo.type == 'ts'">如有疑问，请致电客服热线：400 6685 990</div>
            <div class="modal-hint tc" v-else>
                立即前往<span class="yellow" @click="navTogrzx">“个人中心”</span>查看奖品
            </div>
            <!-- 底部按钮盒子 -->
            <div class="modal-btn" @click="closelotteryModal">
                <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
                <span class="modal-btn-word">确定</span>
            </div>
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
    name:"lotteryModal",
    props:['title','type','modalInfo'],
    data(){
        return{
            // title:"恭喜您获得",
            checked:true
        }
    },
    computed:{
        modaltit(){
            let modaltit;
            modaltit = this.title?this.title:"恭喜您获得"
            return modaltit
        },
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
        closelotteryModal(){
            this.$emit('closelotteryModal')
        }
    }
}
</script>
<style scoped>
.modal-box{
    /* width: 2.95rem;
    box-sizing: border-box;
    position: fixed;
    left: 0.4rem;
    top: 0.9rem;
    background: #69B603;
    background: -webkit-gradient(linear,0% 0%, 0% 100%, from(#69B603), to(#A1ED40), color-stop(0.0,#336600));
    border: 0.02rem solid #f2f1b4;
    border-radius: 0.1rem;
    padding: 0.2rem; */
}
/* 标题 */
.modal-tit{
    color: #fff;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    height: 0.4rem;
    line-height: 0.4rem;
}
.modal-con-box{
    padding: 0.1rem 0;
    background: url(../assets/images/modal-con-top-bg.png) no-repeat center 0,url(../assets/images/modal-con-btm-bg.png) no-repeat center 100%;
    background-size: 100% auto;
    margin-bottom: 0.1rem;
}
.modal-con{
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.2rem;
}
/* 活力值不足 */
.no-hlz{
    color: #46b781;
    font-weight: 600;
    text-align: center;
}
/* 内容区块下方提示文字 */
.modal-hint{
    text-align: center;
    color: #fff;
}
/* 底部按钮 */
.modal-btn{
    width: 1.86rem;
    height: 0.5rem;
    margin: 0.1rem auto;
    margin-bottom: 0;
    position: relative;
}
.modal-btn-bg{
    width: 100%;
    height: 100%;
}
.modal-btn-word{
    position: absolute;
    font-size: 14px;
    font-weight: 600;
    color: #8a5707;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-60%,0)
}
/* 绑定手机号 */
.form-controller{
    height: 0.37rem;
    margin-bottom: 0.175rem;
    box-sizing: border-box;
    position: relative;
    font-size: 0;
    /* padding: 0.04rem 0.08rem; */
}
.form-input{
    width: 100%;
    height: 100%;
    border: 0.02rem solid #5ba74f;
    border-radius: 0.2rem;
    outline: none;
    font-size: 14px;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 0.08rem;
}
.code-img{
    position: absolute;
    right: 0.2rem;
    width: 0.6rem;
    height: 0.3rem;
    top: 0.04rem;
}

/* 奖品弹框 */
.prize-box{
    width: 1.3rem;
    height: 1rem;
    margin: 0 auto;
    position: relative;
    margin-bottom: 0.1rem;
}
.prize-desc{
    color: #489974;
    text-align: center;
    font-size: 14px;
}
/* 微信红包 */
.hb-box{
    background: url(../assets/images/pri-hb.jpg) no-repeat;
    background-size: 1.2rem 0.95rem;
    background-position: center center;
}
.hb-box .prize-num{
    color: #e6314b;
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    left: 0.4rem;
    top: 0.2rem;
}

/* 腾讯动漫阅点礼包 */
.txdm-box{
    background: url(../assets/images/pri-txdm.jpg) no-repeat;
    background-size: 1.19rem 0.90rem;
    background-position: center center;
}

/* 活力值 */
.hdhlz-box{
    background: url(../assets/images/pri-hlz.png) no-repeat;
    background-size: 1.30rem 0.74rem;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hdhlz-box .prize-num{
    color: #fff;
    font-size: 30px;
    font-weight: 600;
}

.leaf-l{
    left: -0.125rem;
    bottom: 20%;
}
</style>


