<template>
  <div class="login-wrap">
    <div class="logo">
      <img src="../static/ic_login_logo.png" alt="网站logo" />
    </div>
    <div class="login-content">
      <div class="choose-item">
        <a
          v-for="(item, index) in items"
          :key="index"
          @click="changeTab(item.value, index)"
          :class="{ on: itemIndex == index }"
          >{{ item.name }}</a
        >
      </div>
      <div v-if="currentTab === 'sms'">
        <div class="input-group">
          <input placeholder="请输入手机号码" v-model="phone"/>
          <input placeholder="请输入短信验证码" class="code-input" v-model="smsCode"/>
          <button class="code-btn" @click="code">发送验证码</button>
        </div>
        <button class="btn-login" @click="submit">登录</button>
        <div class="btn-group">
          <!-- <span>注册新用户</span> -->
          <!-- <span>忘记密码</span> -->
        </div>
      </div>
      <div class="conde-content" v-if="currentTab === 'code'">
        <div class="code">
          <img :src="url" alt="" />
        </div>
        <span class="tips">打开今球App扫描二维码登录</span>
      </div>
    </div>
  </div>
</template>
<script>
import index from './loginm.js'
export default {
  ...index
}
</script>
<style>
.choose-item a {
  display: inline-block;
  width: 2.2rem;
  text-align: center;
  padding-bottom: 0.16rem;
  border-bottom: 1px solid #eeeeee;
  font-size: 0.22rem;
  color: #424242;
}
.choose-item a.on {
  border-bottom: 1px solid #fbc31f;
  color: #171717;
}
.input-group {
  margin-top: 0.6rem;
  margin-bottom: 0.7rem;
}
.input-group input {
  width: 4.4rem;
  height: 0.5rem;
  font-size: 0.18rem;
  border-radius: 0.08rem;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  padding-left: 0.2rem;
}
.input-group input ::-webkit-input-placeholder {
  color: #cecece;
}
.input-group input ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cecece;
}
.input-group input :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cecece;
}
.input-group input :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #cecece;
}
.input-group .code-input {
  width: 3rem;
  margin-right: 0.21rem;
  margin-top: 0.14rem;
}
.input-group .code-btn {
  width: 1.2rem;
  height: 0.5rem;
  border: 1px solid #fbc31f;
  border-radius: 0.08rem;
  line-height: 0.5rem;
  font-size: 0.2rem;
  color: #fbc31f;
  background-color: #ffffff;
}
.btn-login {
  width: 4.4rem;
  height: 0.5rem;
  border: 0;
  border-radius: 0.08rem;
  background-color: #fbc31f;
  color: #171717;
  font-size: 0.16rem;
}
.btn-group {
  width: 4.4rem;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  color: #777777;
  font-size: 0.16rem;
  margin-top: 0.15rem;
}
.logo {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  width: 1rem;
  height: 1rem;
}
.login-content {
  margin-top: 0.48rem;
  text-align: center;
}
.conde-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.code {
  display: inline-block;
  /* width: 2.2rem;
  height: 2.2rem; */
  margin: 0.43rem 0;
  border: 1px solid;
}
.tips {
  font-size: 0.16rem;
  color: #777777;
}
</style>
