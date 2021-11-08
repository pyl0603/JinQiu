<template>
  <div>
    <div class="tg">
      <div class="top-img">
        <img src="https://cdn.jinqiulive.com/static/common/img_a.png" alt="今球app" />
      </div>
      <div class="logo">
        <img src="https://cdn.jinqiulive.com/static/portal/public/img/logobg.png" alt="今球app" />
      </div>
      <div class="cont">
        <p>应用介绍</p>
        <!-- 修改 -->
        <span>1.【头条资讯】全新足球篮球赛事资讯更加专业、战报实时更新推送，让您足不出户即可掌握世界足坛篮坛新鲜资讯。</span>
        <span>2.【赛事报导】网罗各大主流足球篮球赛事，赛前预告、赛后战报和数据分析全都有。</span>
        <span>3.【数据】专业赛事数据支持，联赛/杯赛积分榜，球员榜、赛程数据实时更新。</span>
        <span>4.【个性化】实时关注球队球员动态，不错过您喜爱球队球员的一点一滴。</span>
      </div>
    </div>
    <div class="cxk-tips" v-if="isMobile">
      <div class="logo-slogan">
        <img
          src="https://cdn.jinqiulive.com/static/portal/public/img/logod.png"
          alt="今球app"
          class="dw-img"
        />
        <div class="slogan">
          <span style="font-size: .2rem;">今球 - 今天的足球篮球资讯你get了吗？</span>
          <em style="font-size: .2rem;">
            球迷群:
            <a
              style="color: #18CE94;font-size: .25rem;"
              id="keydiv"
              href="https://jq.qq.com/?_wv=1027&k=5CH95lv"
            >722010628</a> 送球衣球鞋
          </em>
        </div>
      </div>
      <a class="cxk-btn"></a>
    </div>
    <!-- pc端 -->
    <div class="cxk-tips-pc" v-if="!isMobile">
      <div class="logo-slogan-pc">
        <img
          src="https://cdn.jinqiulive.com/static/portal/public/img/logod.png"
          alt="今球app"
          class="dw-img"
        />
        <div class="slogan">
          <span style="font-size: .2rem;">今球 - 今天的足球篮球资讯你get了吗？</span>
          <em style="font-size: .2rem;">
            球迷群:
            <a
              style="color: #18CE94;font-size: .25rem;"
              id="keydiv"
              href="https://jq.qq.com/?_wv=1027&k=5CH95lv"
            >722010628</a> 送球衣球鞋
          </em>
        </div>
      </div>
      <div class="codepng"></div>
    </div>
  </div>
</template>
<script>
// import '@/middleware/auth.js'
export default {
  data() {
    return {
      isMobile: false
    };
  },
  middleware: "auth",
  async asyncData({ userAgent }) {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)) {
      return { isMobile: true };
    }
  }
};
</script>
<style>
/*css閲嶇疆鏍峰紡*/
.wrap {
  display: none !important;
}
html {
  font-size: 13.33vw;
}
@media (min-width: 576px) {
  html,
  body {
    font-size: 70px;
  }
}
.tg {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  background: url("https://cdn.jinqiulive.com/static/common/bg.png") no-repeat
    center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1.11rem;
  overflow: hidden;
  overflow-y: scroll;
}
.top-img {
  text-align: center;
  margin-top: .2rem;
}
.top-img img {
  width: 81.4%;
}
.logo {
  width: 100%;
  text-align: center;
}
.logo img {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
  width: 0.97rem;
}
.cont {
  padding: 0 0.3rem;
  padding-bottom: .5rem;
}

p {
  font-size: 0.3rem;
  color: #171717;
  font-weight: bolder;
  margin-bottom: 0.2rem;
}

span {
  display: block;
  color: #323232;
  font-size: 0.26rem;
  line-height: 0.4rem;
}
.cxk-tips {
  height: 0.7rem;
  width: calc(100% - 0.6rem);
  position: fixed;
  bottom: 0;
  padding: 0.1rem 0.3rem;
  border-radius: 0.08rem;
  border-top: 1px solid #f2f2f2;
  /* line-height: .9rem; */
  color: #171717;
  display: flex;
  justify-content: space-between;
}
.cxk-tips .logo-slogan {
  display: flex;
  justify-content: flex-start;
}
.cxk-tips .logo-slogan img {
  width: 0.62rem;
  height: 0.62rem;
  margin-right: 0.2rem;
}
.cxk-tips .slogan {
  font-size: 0.2rem;
}
#keydiv {
  display: inline-block;
  padding-left: 0.28rem;
  height: 0.28rem;
  background: url("https://cdn.jinqiulive.com/static/portal/public/img/q_all.png")
    no-repeat left;
  background-size: 0.28rem;
}
.cxk-btn {
  width: 1.4rem;
  height: 0.53rem;
  background: url("https://cdn.jinqiulive.com/static/portal/public/img/cxktg.png")
    no-repeat center;
  background-size: 100%;
  border-radius: 0.08rem;
  margin-top: 0.1rem;
}
/* 新增 */

.cxk-tips-pc {
  font-family: "PingFangSC-Medium", Helvetica, Arial, sans-serif;
  border-top: 1px solid #f2f2f2;
  height: 0.9rem;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%) scale(1.5);
  -moz-transform: translateX(-50%) scale(1.5);
  -ms-transform: translateX(-50%) scale(1.5);
  -o-transform: translateX(-50%) scale(1.5);
  transform: translateX(-50%) scale(1.5);
  width: 100%;
  padding-top: 0.14rem;
  padding-bottom: 0.28rem;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0 auto;
  max-width: 430px;
}

.logo-slogan-pc {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
  -moz-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -ms-transform: scale(0.8);
  -o-transform: scale(0.8);
  transform: scale(0.8);
  margin-left: -0.28rem;
}

.logo-slogan-pc img {
  width: 0.62rem;
  height: 0.62rem;
  margin-right: 0.2rem;
  border-radius: 0.1rem;
}

.codepng {
  width: 0.92rem;
  height: 0.92rem;
  background: url(https://cdn.jinqiulive.com/static/portal/public/img/downcode.png)
    no-repeat center;
  -o-background-size: 100%;
  background-size: 100%;
  margin-right: 0.14rem;
  margin-top: -0.3rem;
}
.slogan {
  height: 0.9rem;
}

.slogan span {
  display: block;
  font-size: 0.3rem;
  color: #171717;
  margin-bottom: 0.1rem;
}

.slogan em {
  display: block;
  color: #424242;
  font-size: 0.28rem;
}
</style>