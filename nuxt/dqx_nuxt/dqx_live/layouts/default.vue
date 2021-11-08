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
              @click="chooseItem(item.value)"
              >{{ item.name }}</a
            >
          </div>
        </div>
        <div class="right">
          <a class="non-login">登录</a>
        </div>
      </div>
    </div>
    <Nuxt class="cont" />
    <div class="footer">
      <div>闽ICP19030417号 | 厦门多趣想科技有限公司</div>
      <div>地址：厦门市思明区莲前宝龙一城A塔 联系电话：0592-5575923</div>
      <div>公网安备11233462635号</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "首页", value: 0 },
        { name: "直播", value: 1 },
        { name: "赛程", value: 2 },
        { name: "下载App", value: 3 }
      ],
      itemIndex: 0
    };
  },
  methods: {
    chooseItem(val) {
      this.itemIndex = val;
    }
  }
};
</script>
<style>
.cont {
  min-height: calc(100vh - 1.47rem);
}
.header {
  width: 100%;
  height: 0.6rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 4px 0px rgba(238, 238, 238, 1);
  position: fixed;
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
  height: 1.47rem;
  background: rgba(23, 23, 23, 1);
  padding-top: .3rem;
}
.footer div{
  display: block;
  width: 100%;
  text-align: center;
  padding-top: .1rem;
}
@media screen and (max-width: 1200px) and (min-width: 1024px) {
  html {
    font-size: 90px;
  }
  .type-area {
    width: 1024px;
    margin: 0 auto;
    position: relative;
  }
}
@media screen and (max-width: 1024px) {
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
</style>
