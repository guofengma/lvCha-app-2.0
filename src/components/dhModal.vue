<template>
    <div class="modal-com">
        <div class="mask"></div>
        <!-- 兑换弹框 确认兑换 -->
        <div class="modal-box">
            <!-- 标题 -->
            <div class="modal-tit">{{modalInfo.title}}</div>
            <!-- 内容区域 -->
            <div class="modal-con-box">
                <div class="modal-con ">
                    <!-- <div class="con-word">恭喜您获得500活力值</div> -->
                <div class="no-hlz" v-if="modalInfo.type == 'sureDh'">确定消耗{{modalInfo.num}}兑换该奖品吗？</div>
                <div class="no-hlz" v-if="modalInfo.type == 'dhsuc' || modalInfo.type == 'ts'">{{modalInfo.content}}</div>
                </div>
            
            </div>
            <div class="modal-hint" v-if="modalInfo.type == 'dhsuc'">
                    奖品已发放至个人中心，请至个人中心完善资料
                </div>
                <div class="modal-hint" v-if="modalInfo.type == 'dherr'">
                    {{modalInfo.content}}
                </div>
            <!-- 底部按钮盒子 -->
            <div class="modal-btn" @click="closeDhModal" v-if="modalInfo.type == 'ts'">
                <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
                <span class="modal-btn-word">确定</span>
            </div>
            <!-- 底部按钮盒子 -->
            <div class="btns-box" v-else>
                <div class="btn gray-btn" @click="closeDhModal">取消</div>
                <div class="btn yellow-btn" @click="goodsExchange(modalInfo)">确定</div>
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
    name:"dhModalT",
    props:['modalInfo'],
    data(){
        return{
        }
    },
    methods:{
        //关闭弹框
        closeDhModal(){
            this.$emit('closeDhModal')
        },
        // 传递到兑换函数
        goodsExchange(modalInfo){
            this.$emit('goodsExchange',{id:modalInfo.id,prizeName:modalInfo.prizeName})
        }
    }
}
</script>
<style>
.modal-box{
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

/* 底部两个按钮 */
.btns-box{
    display: flex;
    justify-content: space-around;
}

.btn{
    font-size: 12px;
    width:1.15rem;
    height: 0.325rem;
    background: #eee;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 0.5rem;
    font-weight: 600;
}
.gray-btn{
    background: #bdbdbd;
    color: #222;
}
.yellow-btn{
    background: #f8de46;
    color: #673500;
}
</style>


