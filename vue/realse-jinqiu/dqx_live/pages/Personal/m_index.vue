<template>
    <div class="m-personal-warp">
			<Login v-if="isShow" @succeeLog="succeeLog" />
			<div v-if="!isShow">
				<div class="m-personal">
				<div class="info">
					<img :src="avatar" alt="" class="user-ava" />
          <span>{{ name }}</span>
				</div>
				<div class="info-mobile">
					<span>手机号</span>
					<span>{{mobile}}</span>
				</div>
			</div>
			<div class="logout-btn" @click="logoutFun">退出登录</div>
			</div>
		</div>
</template>
<script>
import { getToken, setToken, removeToken } from "@/utils/auth";
import Login from "@/components/m_login";
import { getInfo, logout } from "@/api/user";
export default {
	layout: "m_default",
  components: {
		Login
  },
  data() {
		return {
			name: "",
			avatar: "",
			mobile: "",
			isShow: true
		}
	},
	methods: {
		logoutFun() {
      logout().then(res => {
        removeToken();
        this.name = "";
				this.avatar = "";
				this.mobile = "";
				this.isShow = true;
        this.$message.info("退出登录");
      });
    },
		getUserInfo() {
      getInfo()
        .then(res => {
          this.name = res.data.nickname;
					this.avatar = res.data.avatar;
					this.mobile = res.data.mobile;
        })
        .catch(error => {
          if (error.code == 401) {
            removeToken();
            this.name = "";
						this.avatar = "";
						this.mobile = "";
            window.location.reload();
          }
        });
    },
		succeeLog() {
			this.isShow = false;
			this.getUserInfo();
    },
	},
  watch: {
  },
  mounted() {
		const token = getToken();
		if (token) {
			this.isShow = false;
      this.getUserInfo();
    }
  }
};
</script>
<style scoped>
.m-personal {
	padding-top: 1rem;
	font-size: 0.32rem;
	color: #181818;
}
.m-personal .info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 1rem;
}
.m-personal .info .user-ava {
	width: 1.6rem;
	height: 1.6rem;
	border-radius: 50%;
	margin-bottom: 0.4rem;
}
.m-personal .info-mobile {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.36rem 0.3rem;
	border-bottom: 0.01rem solid #EEEEEE;
	border-top: 0.01rem solid #EEEEEE;
}
.m-personal-warp .logout-btn {
	position: absolute;
	bottom: 1.42rem;
	width: 100%;
	height: 0.88rem;
	line-height: 0.88rem;
	text-align: center;
	border-radius: 0.08rem;
	border: 0.01rem solid #F0F0F0;
	background: #F5F5F5;
	font-size: 0.3rem;
	color: #181818;
}
</style>
