<template>
    <div class="modal-com">
        <div class="mask"></div>
        <!-- 绑定手机号 弹框 -->
        <div class="modal-box">
            <!-- 标题 -->
            <div class="modal-tit">绑定手机号</div>
            <!-- 内容区域 -->
            <div class="modal-con-box">
                <div class="modal-con none">
                    <!-- <div class="con-word">恭喜您获得500活力值</div> -->
                    <div class="no-hlz">亲，活力值不足，无法兑换该奖品</div>
                </div>
                <!-- 绑定手机号 -->
                <div class="modal-con">
                    <div class="form-controller">
                        <input type="number" class="form-input" placeholder="请输入手机号" v-model="phone">
                        <p class="red">{{phoneHintWord}}</p>
                    </div>
                    <div class="form-controller">
                        <input type="text" class="form-input" placeholder="请输入验证码" v-model="code">
                        <!-- 图片验证码 -->
                        <img 
                        :src="yzmCode" 
                        @click="getCodeImg"
                        alt="" class="code-img">
                        <p class="red">{{codeHintWord}}</p>
                    </div>
                </div>
            </div>
            <!-- <div class="modal-hint">立即前往“个人中心”查看奖品</div> -->
            <div class="modal-hint">
                <p>请填写真实手机号码，以便进行奖品发放</p>
                <p>
                    <label for=""><input type="checkbox" name="" id="" v-model="checked">我同意</label>
                    <span class="yellow" @click="showHdgz">活动规则</span>
                </p>
                <p class="red" v-if="!checked">请先阅读并同意活动规则</p>
            </div>
            <!-- 底部按钮盒子 -->
            <div class="modal-btn none">
                <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
                <span class="modal-btn-word">关闭</span>
            </div>
            <!-- 底部按钮盒子 -->
            <div class="modal-btn" @click="bindPhone">
                <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
                <span class="modal-btn-word">提交</span>
            </div>
            <!-- 左上角小绿人图标 -->
            <img src="../assets/images/xlr.png" alt="" class="xlr-icon">
            <!-- 左树叶 -->
            <img src="../assets/images/leaf-l-01.png" alt="" class="leaf-icon leaf-l-01">
            <!-- 右树叶 -->
            <img src="../assets/images/leaf-r.png" alt="" class="leaf-icon leaf-r">
        </div>
        
    </div>
</template>
<script>
import url from '../../static/js/url.js'
export default {
    name:"bindPhoneModal",
    props:['title','type'],
    data(){
        return{
            checked:true,
            phone:"",
            code:"",
            yzmCode:url.getCodeImg,
            phoneHintState:false,
            phoneHintWord:"",
            codeHintState:false,
            codeHintWord:"",
            chooseHintState:false,
        }
    },
    methods:{
        //显示活动规则
        showHdgz(){
            this.$store.commit('showHdgz')
        },
        // 更新图片验证码
        getCodeImg(){
            this.yzmCode =  url.getCodeImg+'?v='+new Date();
        },
        // 绑定手机号
        bindPhone(){
            this.phoneHintWord = ""
            this.codeHintWord = ""
            var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
            let checked = this.checked; 
            let reqData={
                phone:this.phone,
                code:this.code,
            }
            if(!checked){
                // this.chooseHintState = true;
                // alert("请先阅读并同意活动规则")
                return;
            }
             if (!pattern.test(reqData.phone)){
                 this.phoneHintState = true
                 this.phoneHintWord = "手机号错误"
                    // alert("手机号错误")
                return;
            }
            if(reqData.code == '' || reqData.code == null || reqData.code == undefined){
                this.codeHintState = true
                 this.codeHintWord = "验证码错误"
                // codeHintWord
                    // alert("验证码错误")
                return;
            }
            this.axios.get(url.bindPhone,{params:reqData}).then((response) => {
                console.log("绑定手机号 res -->",response)
                if(response.data.state == 'ok'){//绑定成功
                    //保存手机号到缓存
                    localStorage.setItem("userPhone",this.phone)
                   this.$router.push({path:'lottery'})
                }else{//未绑定手机号
                    if(response.data.msg.indexOf('手机号')>-1){
                        this.phoneHintState = true
                        this.phoneHintWord = response.data.msg
                    }
                    if(response.data.msg.indexOf('验证码')>-1){
                         this.codeHintState = true
                        this.codeHintWord = response.data.msg
                    }
                    // alert(response.data.msg)
                }
            }).catch((response)=>{
                alert("请求失败")
                console.log("请求失败 -->",response)
            })
        },
    }
}
</script>
<style>
.modal-com{
    /* font-size: 12px;
    width: 2.95rem;
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
    font-size: 12px;
    color: #34a32d;
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
    margin-bottom: 0.175rem;
    box-sizing: border-box;
    position: relative;
    font-size: 0;
    /* padding: 0.04rem 0.08rem; */
}
.form-input{
    width: 100%;
    height: 0.37rem;
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

.leaf-l-01{
    left: 0.01rem;
    bottom: -0.15rem;
}


</style>


