<template>
  <div>
    <div class="header">
      <div class="header-cont type-area">
        <div class="left">
          <img src="../static/logo.png" alt="" />
          <div class="list">
            <a
              :class="{ on: itemIndex == item.value }"
              v-for="item in list"
              :key="item.value"
              @click="chooseItem(item.value, item.url)"
              >{{ item.name }}</a
            >
          </div>
        </div>
        <div class="right">
          <a class="non-login" @click="loginFun" v-if="name === ''">登录</a>
          <div class="has-info" v-if="name !== ''">
            <img :src="avatar" alt="" class="user-ava" />
            <span>{{ name }}</span>
            <img
              src="../static/logout.png"
              alt=""
              class="log-out"
              @click="logoutFun"
            />
          </div>
        </div>
      </div>
    </div>
    <Nuxt class="cont type-area" />
    <div class="for-adv" ref="ad">
      <div class="left-ad">
        <em class="ad-logo"  v-if="imgUrlOne != ''"></em>
        <em class="ad-close"  v-if="imgUrlOne != ''" @click="imgUrlOne = ''"></em>
        <img :src="imgUrlOne" v-if="imgUrlOne != ''" @click="advFun(adMsg)"/>
      </div>
      <div class="right-ad">
        <em class="ad-logo" v-if="imgUrlTwo != ''"></em>
        <em class="ad-close" v-if="imgUrlTwo != ''"  @click="imgUrlTwo = ''"></em>
        <img :src="imgUrlTwo"  v-if="imgUrlTwo != ''"  @click="advFun(adMsgTwo)"/>
      </div>
    </div>
    <div class="footer" id="footer" ref="footer">
      <div>闽ICP19030417号 | 厦门多趣想科技有限公司</div>
      <div>地址：厦门市思明区莲前宝龙一城A塔 联系电话：0592-5575923</div>
      <div>公网安备11233462635号</div>
    </div>
    <a-modal :visible="isShow" :footer="null" @cancel="closeTop">
      <Login @succeeLog="succeeLog" />
    </a-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getHomeLeft,getHomeRight } from '@/api/adv'
import Login from "@/components/login.vue";
import {
  getToken,
  setToken,
  removeToken,
  getName,
  setName,
  removeName,
  getAvatar,
  setAvatar,
  removeAvatar
} from "@/utils/auth";
import { getInfo, logout } from "@/api/user";
export default {
  data() {
    return {
      list: [
        { name: "首页", value: 0, url: "/" },
        { name: "直播", value: 1, url: "live" },
        { name: "赛程", value: 2, url: "schedule" },
        { name: "下载App", value: 3, url: "appdownload" }
      ],
      itemIndex: 0,
      isShow: false,
      name: "",
      avatar: "",
      imgUrlOne:'',
      imgUrlTwo:'',
      adMsg:{resType:''},
      adMsgTwo:{resType:''},
    };
  },
  head () {
    return {
      title:'今球-一个看球的专业平台',
      meta: [
        { hid: 'description', name: 'description', content: '人人都想看的直播平台' }
      ]
    }
  },
  async mounted() {
    if (getToken()) {
      this.getUserInfo();
    }
    let imgOne = await getHomeLeft()
    this.adMsg = imgOne.data
    this.imgUrlOne = imgOne.data ? imgOne.data.image : ''
    let imgTwo = await getHomeRight()
    this.imgUrlTwo = imgTwo.data ? imgTwo.data.image : ''
    this.adMsgTwo = imgTwo.data
  },
  methods: {
    advFun(e){
      console.log(e.resType.value)
      if(e.resType.value === 7){
        this.$router.push({path: '/room', query: {id: e.resId}})
      }else{
        window.location.href = e.resUrl
      }
    },
    chooseItem(val, e) {
      this.itemIndex = val;
      this.$router.push({ path: `${e}` });
    },
    loginFun() {
      this.isShow = true;
      // this.$store.commit("user/SET_LOGINTOP", true);
    },
    logoutFun() {
      logout().then(res => {
        removeToken();
        removeName();
        removeAvatar();
        this.name = "";
        this.avatar = "";
        this.$message.info("退出登录");
      });
    },
    getUserInfo() {
      getInfo()
        .then(res => {
          this.name = res.data.nickname;
          this.avatar = res.data.avatar;
          setName(res.data.nickname);
          setAvatar(res.data.avatar);
        })
        .catch(error => {
          if (error.code == 401) {
            removeToken();
            removeName();
            removeAvatar();
            this.name = "";
            this.avatar = "";
            window.location.reload();
          }
        });
    },
    succeeLog() {
      this.isShow = false;
      this.$store.commit("user/SET_LOGINTOP", false);
      this.getUserInfo();
    },
    closeTop() {
      this.isShow = false;
      this.$store.commit("user/SET_LOGINTOP", false);
    }
  },

  computed: {
    ...mapGetters(["loginTop"])
  },
  watch: {
    loginTop(newVal) {
      console.log(newVal);
      this.isShow = newVal;
      console.log(this.isShow);
    }
  }
};
</script>
<style>
.ad-close{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url('../static/close.png')no-repeat center;
  background-size: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
}
.ad-logo{
  display: inline-block;
  width: 24px;
  height: 12px;
  background: url('../static/ad.png')no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 9;
}
.for-adv {
  position: sticky;
  bottom: 20px;
  max-width: 1600px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  z-index: 9;
}
.for-adv img,.for-adv div {
  width: 178px;
  height: 100px;
}
.for-adv div {
  position: relative;
}
.has-info {
  height: 0.36rem;
  display: flex;
  align-items: center;
  margin-top: 0.1rem;
}
.has-info img.user-ava {
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.has-info img.log-out {
  width: 0.2rem;
  margin-left: 0.2rem;
  cursor: pointer;
}
.cont {
  min-height: calc(100vh - 1.47rem);
  padding-top: 0.6rem;
}
.header {
  width: 100%;
  height: 0.6rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 4px 0px rgba(238, 238, 238, 1);
  position: fixed;
  z-index: 12;
}
.header-cont {
  position: relative;
  height: 0.6rem;
  line-height: 0.6rem;
  display: flex;
  justify-content: space-between;
}
.header-cont .left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-cont .left img {
  height: 0.34rem;
}
.header-cont .left a {
  display: inline-block;
  margin-left: 0.66rem;
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: 600;
  height: 0.5rem;
  line-height: 0.5rem;
  color: rgba(23, 23, 23, 1);
}
.header-cont .left a.on {
  border-bottom: 0.04rem solid #fbc31f;
}
.non-login {
  display: inline-block;
  height: 0.22rem;
  padding-left: 0.3rem;
  background: url("../static/ic_login.png") no-repeat left;
  background-size: 0.18rem 0.22rem;
  font-size: 0.18rem;
  color: rgba(66, 66, 66, 1);
  font-family: PingFang SC;
  line-height: 0.22rem;
}
.footer {
  color: #ffffff;
  font-size: 0.12rem;
  height: 147px;
  background: rgba(23, 23, 23, 1);
  padding-top: 30px;
}
.footer div {
  display: block;
  width: 100%;
  text-align: center;
  padding-top: 0.1rem;
}
@media screen and (max-width: 1200px) and (min-width: 1025px) {
  html {
    font-size: 88px;
  }
  .type-area {
    width: 1024px;
    margin: 0 auto;
    position: relative;
  }
}
@media screen and (max-width: 1025px) and (min-width: 769px) {
  html {
    font-size: 80px;
  }
  .type-area {
    width: 960px;
    margin: 0 auto;
    position: relative;
  }
}
@media screen and (min-width: 1200px) {
  html {
    font-size: 100px;
  }
  .type-area {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
}
/* .cont{
  height: calc(100vh - .6rem - 1.8rem);
}
.cont::-webkit-scrollbar {
    display: none;
  } */
.ant-pagination-item-active {
  border: none;
}
.ant-pagination-item-active a {
  color: #ffffff;
  border: 1px solid #fbc31f;
  background: #fbc31f;
  border-radius: 4px;
}
</style>
