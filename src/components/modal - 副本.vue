<template>
    <div class="modal-com">
        <!-- 弹框 -->
        <!-- 标题 -->
        <div class="modal-tit">{{title}}</div>
        <!-- 内容区域 -->
        <div class="modal-con-box">
            <div class="modal-con none">
                <!-- <div class="con-word">恭喜您获得500活力值</div> -->
                <div class="no-hlz">亲，活力值不足，无法兑换该奖品</div>
            </div>
            <!-- 绑定手机号 -->
            <div class="modal-con" v-if="type == 'bindPhone'">
                <div class="form-controller">
                    <input type="number" class="form-input" placeholder="请输入手机号">
                </div>
                <div class="form-controller">
                    <input type="text" class="form-input" placeholder="请输入验证码">
                    <img src="../assets/images/erweima.jpg" alt="" class="code-img">
                </div>
            </div>
        </div>
        <!-- <div class="modal-hint">立即前往“个人中心”查看奖品</div> -->
        <div class="modal-hint" v-if="type == 'bindPhone'">
            <p>请填写真实手机号码，以便进行奖品发放</p>
            <p><input type="checkbox" name="" id="" v-model="checked">我同意<span class="yellow">活动规则</span></p>
        </div>
        <!-- 底部按钮盒子 -->
        <div class="modal-btn none">
            <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
            <span class="modal-btn-word">关闭</span>
        </div>
        <!-- 底部按钮盒子 -->
        <div class="modal-btn" v-if="type == 'bindPhone'">
            <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
            <span class="modal-btn-word">提交</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"modal",
    props:['title','type'],
    data(){
        return{
            // title:"恭喜您获得"
            checked:true
        }
    },  
}
</script>
<style>
.modal-com{
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
</style>


