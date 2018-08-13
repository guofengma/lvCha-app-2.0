<template>
    <div class="loading-page">
        <!-- 进度条 -->
        <div class="progress-box">
            <div class="progress" :style="{width:pro}">
                <img src="../assets/images/jd.png" alt="" class="progress-icon">
            </div>
            <!-- 进度数值 -->
            <span class="progress-num">{{loadingNum}}%</span>
        </div>
         <!-- 绑定手机号 -->
        <modal 
            v-if="showModal"
            title="绑定手机号"
            type="bindPhone"
        ></modal>
         <!-- 活动规则 -->
        <hdgz v-if='hdgzState' @closeHdgz='closeHdgz'></hdgz>
        <!-- 绑定手机号 -->
        <bindPhoneModal v-if="showbindPhoneModal"></bindPhoneModal>
    </div>
</template>
<script>
import url from '../../static/js/url.js'
import modal from './modal'
import hdgz from './hdgz'
import bindPhoneModal from './bindPhoneModal'
export default {
    name:'loading',
    components:{modal,hdgz,bindPhoneModal},
    data(){
        return{
            loadingNum:0,
            pro:0,
            showHdgz:false,
            showModal:false,
            showbindPhoneModal:false,
        }
    },
    created(){
        console.log('loading');
        // this.getIsBindPhone();

        this.loading()

         //获取用户手机号 、渴望币
        // this.getUserinfo()
    },
    computed:{
        hdgzState(){
            return this.$store.state.hdgzState
        }
    },
    methods:{
        loading(){
            let timer = setInterval(()=>{
                if(this.loadingNum < 100){
                    this.loadingNum +=1
                    this.pro = this.loadingNum+'%'
                }else{
                    clearInterval(timer)
                    this.getIsBindPhone();
                }
            },20)
        },

        //是否绑定手机号
        getIsBindPhone(){
            this.axios.get(url.juageIsBind).then((response) => {
                console.log("是否绑定手机号 res -->",response)
                if(response.data.state == 'ok'){//已绑定手机号 跳转转盘抽奖
                    this.$router.push({path:'lottery'})
                }else{//未绑定手机号 弹出绑定手机号弹框
                    this.showbindPhoneModal = true
                }
            }).catch((response)=>{
                console.log("是否绑定手机号请求失败 err -->",response)
            })
        },

        //获取用户手机号 、渴望币
        getUserinfo(){
            this.axios.get(url.getUserInfo,).then((response) => {
                console.log("获取用户手机号 、渴望币 res -->",response)
                if(response.data.state == 'ok'){//
                   localStorage.setItem('userPhone',response.data.phone);
                   localStorage.setItem('hlz',response.data.rest_point);
                }else{//
                    console.log("获取用户手机号 、渴望币 失败")
                }
            }).catch((response)=>{
                console.log("获取用户手机号 、渴望币 err -->",response)
            })
        },

        toggleHdgz(){
            this.showHdgz = !this.showHdgz
        },
        closeHdgz(){
            this.showHdgz = false

        }
    }
}
</script>

<style>
.loading-page{
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg.jpg) no-repeat;
    background-size: 100%;
    position: relative;
    background-position: center -0.7rem;
    background-color: #53aa33;
}
.progress-box{
    height: 0.2rem;
    width: 2.10rem;
    /* background: #ebf67e; */
    background: #828c1f;
    border: 2px solid #86725d;
    border-radius: 3rem;
    position: absolute;
    top: 2.97rem;
    left: calc(50vw - 1.05rem);
    padding-top: 0.0rem;
    box-sizing: border-box;
}
.progress{
    height: 0.16rem;
    background: #66ae00;
    border-radius: 3rem;
    box-sizing: border-box;
    position: relative;
    width: 50%;
}
.progress-icon{
    width: 0.285rem;
    position: absolute;
    right: -0.1rem;
    top: -0.1rem;
}
.progress-num{
    position: absolute;
    font-size: 12px;
    color: #fff;
    left: 45%;
    top: 20%;
    font-weight: 600;
}
</style>

