<template>
    <div class="modal-com">
        <div class="mask" @click="closeUserInfoModal"></div>
        <!-- 弹框  输入信息-->
        <div class="userinfo-modal-box"  v-if="modalInfo.type == 'input'">
          <img src="../assets/images/xlr.png" alt="" class="xlr-icon">
          <!-- 左树叶 -->
            <img src="../assets/images/leaf-l.png" alt="" class="leaf-icon leaf-l">
            <!-- 右树叶 -->
            <img src="../assets/images/leaf-r.png" alt="" class="leaf-icon leaf-r">
          <!-- 内容区域 -->
          <div class="modal-con-box">
              <!-- 完善个人信息 -->
              <div class="modal-con">
                <!-- 标题 -->
                <div class="modal-tit">请完善个人信息进行奖品领取</div>
                  <div class="form-controller">
                      <input type="text" 
                        class="form-input" 
                        placeholder="请输入您的真实姓名" 
                        v-model="userName"
                        >
                  </div>
                  <div class="form-controller">
                      <input disabled type="number" class="form-input" placeholder="请输入手机号" v-model="userPhone">
                  </div>
                  <div class="form-controller addr-select-box" style="display:none;">
                      <div class="addr-select">省</div>
                      <div class="addr-select">市</div>
                      <div class="addr-select">区/县</div>
                  </div>
                  <v-distpicker @selected="onSelected"></v-distpicker>
                  <div class="form-hei-controller">
                    <textarea type="text" class="form-hei-input" placeholder="请输入详细地址" v-model="site"></textarea>
                  </div>
              </div>
          </div>
          <!-- <div class="modal-hint">立即前往“个人中心”查看奖品</div> -->
          <div class="modal-hint">
              资料一经提交无法修改，主办方将核实资料和真实姓名，活动结束后统一发放奖品，有疑问请拨打活动客服热线：400-6685-990
          </div>
          <!-- 底部按钮盒子 -->
          <div class="modal-btn" @click="saveUserAddrInfo">
              <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
              <span class="modal-btn-word">提交</span>
          </div>
        </div>

        <!-- 弹框  查看信息-->
        <div class="userinfo-modal-box" v-if="modalInfo.type == 'output'">
         
          <!-- 内容区域 -->
          <div class="modal-con-box">
              <!-- 完善个人信息 -->
              <div class="modal-con">
                 <!-- 标题 -->
                <div class="modal-tit">请确认个人信息</div>
                  <div class="form-controller">
                      <input type="text" 
                        class="form-input" 
                        placeholder="请输入您的真实姓名" 
                        v-model="userName"
                        disabled
                        >
                  </div>
                  <div class="form-controller">
                      <input disabled type="number" class="form-input" placeholder="请输入手机号" v-model="userPhone">
                  </div>
                  <div class="form-controller addr-select-box">
                      <div class="addr-select">{{province}}</div>
                      <div class="addr-select">{{city}}</div>
                      <div class="addr-select">{{area}}</div>
                  </div>
                  <!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
                  <div class="form-hei-controller">
                    <textarea type="text" disabled class="form-hei-input" placeholder="请输入详细地址" v-model="site"></textarea>
                  </div>
              </div>
          </div>
          <!-- <div class="modal-hint">立即前往“个人中心”查看奖品</div> -->
          <div class="modal-hint">
            信息已提交，活动结束后统一发放奖品，请耐心等待。
          </div>
          <!-- 底部按钮盒子 -->
          <div class="modal-btn" @click="closeUserInfoModal">
              <img src="../assets/images/modal-btn-bg.png" alt="" class="modal-btn-bg">
              <span class="modal-btn-word">关闭</span>
          </div>
        </div>
    </div>
</template>
<script>
import url from "../../static/js/url.js";
import VDistpicker from "v-distpicker";
export default {
  name: "userInfoModal",
  props: ['modalInfo'],
  components: { VDistpicker },
  data() {
    return {
      // title:"恭喜您获得"
      checked: true,
      userPhone: localStorage.getItem("userPhone"),
      userName: "",
      province: "", //省
      city: "", //市
      area: "", //区
      site: "" //详细地址
    };
  },
  created(){
    if(this.modalInfo.type == 'output'){
      console.log('从缓存获取用户信息')
      this.userName = localStorage.getItem('userName')
      this.province = localStorage.getItem('province')
      this.city = localStorage.getItem('city')
      this.area = localStorage.getItem('area')
      this.site = localStorage.getItem('site')
    }
  },
  methods: {
    //省市区地址选择
    onSelected(data) {
      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
      console.log(data);
    },
    //完善个人地址信息
    saveUserAddrInfo() {
      let userName = this.userName;
      let province = this.province;
      let city = this.city;
      let area = this.area;
      let site = this.site;
      if(userName == '' || userName == null || userName == undefined ||
      province == '' || province == null || province == undefined ||
      city == '' || city == null || city == undefined || 
      area == '' || area == null || area == undefined ||
      site == '' || site == null || site == undefined){
        this.$emit('openModal')
        return
      }
      let reqData = {
        consignee_name: userName,
        consignee_province: province,
        consignee_city: city,
        consignee_district: area,
        consignee_detailedaddress: site,
        register_id: this.modalInfo.id
      };
      this.axios
        .get(url.saveUserAddr, { params: reqData })
        .then(response => {
          console.log("完善个人地址信息 res -->", response);
          if (response.data.state == "ok") {
            localStorage.setItem("userName",userName)
            localStorage.setItem("province",province)
            localStorage.setItem("city",city)
            localStorage.setItem("area",area)
            localStorage.setItem("site",site)
            this.$emit('getPrizeList')
            this.closeUserInfoModal()
            alert('保存成功')
          } else {
            alert(response.data.info)
          }
        })
        .catch(response => {
          console.log("请求失败 -->", response);
        });
    },
    closeUserInfoModal() {
      this.$emit("closeUserInfoModal");
    }
  }
};
</script>
<style scoped>
.userinfo-modal-box{
  font-size: 12px;
  width: 2.95rem;
  box-sizing: border-box;
  position: fixed;
  left: 0.4rem;
  top: 0.9rem;
  background: #69b603;
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#69b603),
    to(#a1ed40),
    color-stop(0, #336600)
  );
  /* height: 1rem; */
  border: 0.02rem solid #f2f1b4;
  border-radius: 0.1rem;
  padding: 0.1rem;
}
/* 标题 */
.modal-tit {
  color: #358d68;
  font-size: 16px;
  text-align: center;
  /* font-weight: 600; */
  height: 0.4rem;
  line-height: 0.4rem;
}
.modal-con-box {
  padding: 0.1rem 0;
  background: url(../assets/images/modal-con-top-bg.png) no-repeat center 0,
    url(../assets/images/modal-con-btm-bg.png) no-repeat center 100%;
  background-size: 100% auto;
  margin-bottom: 0.1rem;
}
.modal-con {
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 0.2rem;
}
/* 活力值不足 */
.no-hlz {
  color: #46b781;
  font-weight: 600;
  text-align: center;
}
/* 内容区块下方提示文字 */
.modal-hint {
  font-size: 12px;
  color: #fff;
}
/* 底部按钮 */
.modal-btn {
  width: 1.86rem;
  height: 0.5rem;
  margin: 0.1rem auto;
  margin-bottom: 0;
  position: relative;
}
.modal-btn-bg {
  width: 100%;
  height: 100%;
}
.modal-btn-word {
  position: absolute;
  font-size: 14px;
  font-weight: 600;
  color: #8a5707;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -60%, 0);
}
/* 绑定手机号 */
.form-controller {
  height: 0.37rem;
  margin-bottom: 0.175rem;
  box-sizing: border-box;
  position: relative;
  font-size: 0;
  /* padding: 0.04rem 0.08rem; */
}
.form-input {
  width: 100%;
  height: 100%;
  border: 0.02rem solid #5ba74f;
  border-radius: 0.2rem;
  outline: none;
  font-size: 14px;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 0.08rem;
  color: #333;
}
/* 地址选择 */
.addr-select-box {
  display: flex;
  justify-content: space-around;
}
.addr-select {
  border: 0.02rem solid #5ba74f;
  border-radius: 0.2rem;
  font-size: 12px;
  overflow: hidden;
  box-sizing: border-box;
  width: 0.65rem;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  white-space: nowrap;
  padding:0 0.01rem;
}

.form-hei-controller {
  /* height: 0.57rem; */
}

.form-hei-input {
  height: 0.57rem;
  width: 100%;
  border: 0.02rem solid #5ba74f;
  border-radius: 0.2rem;
  outline: none;
  font-size: 14px;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 0.08rem;
  padding: 0.1rem;
}
</style>
<style>
/* 地址选择插件 */
.distpicker-address-wrapper {
  display: flex;
  margin-bottom: 0.2rem;
  justify-content: space-around;
}
.distpicker-address-wrapper select {
  height: 0.3rem !important;
  width: 0.7rem !important;
  padding: 0 !important;
  font-size: 12px !important;
  /* border:0.02rem solid #5ba74f; */
  box-sizing: border-box;
  overflow: hidden !important;
  border: 0.02rem solid #5ba74f;
  background:#fff !important;
}

.distpicker-address-wrapper select option {
  width: 100%;
  font-size: 12px;
}

.leaf-l{
  left: -0.125rem;
  top: 40%;
}
</style>



