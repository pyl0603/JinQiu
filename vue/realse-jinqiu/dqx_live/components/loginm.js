import openSocket from "socket.io-client";
import { login, getCode } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
let socket = openSocket(`http://socket.jinqiulive.com:9999?client=admin`);
export default {
  data() {
    return {
			phone:'',
      itemIndex: 0,
      currentTab: "sms",
      items: [
        { name: "短信登录", value: "sms" },
        { name: "扫码登录", value: "code" }
      ],
			url: "",
			smsCode:""
    };
  },
  created() {},
  methods: {
		// 登录
		submit(){
			login({mobile:this.phone,code:this.smsCode}).then(res => {
				this.$message.info('登录成功');
        console.log(res)
        setToken(res.data.access_token);
				this.$emit("succeeLog")
			})
		},
		// 获取短信验证码
		code(){
			getCode({mobile:this.phone}).then(res => {
				this.$message.info('发送成功');
			})
		},
		// 
    changeTab(val, e) {
      this.currentTab = val;
      this.itemIndex = e;
      if (e === 1) {
        this.getCodes();
      }
    },
    getCodes() {
      socket = openSocket(`http://socket.jinqiulive.com:9999?client=admin`);
      socket.on("connect", () => {
        this.url = `https://api.jinqiulive.com/client-live-member/login/generate-qrcode/${socket.id}`;
      });
      socket.on("dqx.auth.scan-login", data => {
				setToken(data.token);
				this.$emit("succeeLog")
      });
		},
		toAgreent() {
			this.$router.push('/Personal/m_agreement')
	 },
	 toPrivacy() {
			this.$router.push('/Personal/m_incrementProt')
	 }
  }
};