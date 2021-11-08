<template>
    <div class="m-login">
      <h2 class="title">登录</h2>
	    <div class="m-input-group">
        <input placeholder="请输入手机号码" v-model="phone"/>
        <input placeholder="请输入短信验证码" class="code-input" v-model="smsCode"/>
        <button class="code-btn" @click="code">发送验证码</button>
      </div>
			<button class="btn-login" @click="submit">登录</button>
			<p class="msg">登录即同意<a @click="toAgreent">今球用户协议</a>和<a @click="toPrivacy">隐私政策</a></p>
    </div>
</template>
<script>
import index from './loginm.js'
export default {
		...index,
  layout: "m_default",
}
</script>
<style scoped>
.m-login {
	width: 100%;
	padding: 1.2rem 0.3rem;
}
.m-login .title {
	font-size: 0.48rem;
	color: #181818;	
	font-weight: 500;
	margin-bottom: 0.6rem;
}
.m-input-group {
	position: relative;
}
.m-input-group input {
	display: block;
	width: 100%;
	height: 1rem;
	background: #ffffff;
	border: 0;
	border-bottom: 0.01rem solid #EEEEEE;
	font-size: 0.3rem;
}
.m-input-group input ::-webkit-input-placeholder {
  color: #AEAEAE;
}
.m-input-group input ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #AEAEAE;
}
.m-input-group input :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #AEAEAE;
}
.m-input-group input :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #AEAEAE;
}
.m-input-group .code-btn {
	position: absolute;
	right: 0;
	bottom: 0.27rem;
  width: 1.8rem;
  height: 0.56rem;
  border-radius: 0.08rem;
  line-height: 0.56rem;
  font-size: 0.28rem;
	text-align: center;
  color: #fff;
  background-color: #fbc31f;
	border: 0;
}
.btn-login {
  width: 100%;
  height: 0.88rem;
  border: 0;
  border-radius: 0.08rem;
  background-color: #fbc31f;
  color: #181818;
  font-size: 0.32rem;
	margin-top: 1.8rem;
}
.msg {
	margin-top: 0.2rem;
	font-size: 0.24rem;
	color: #AEAEAE;
}
.msg a {
	color: #FBC420;
}
</style>
