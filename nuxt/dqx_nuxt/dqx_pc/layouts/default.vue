<template>
  <div>
    <div class="wrap header" v-if="!(path ==='/tg') ">
      <div class="wrap1 headerin">
        <div class="logo">
          <img src="~assets/img/logo.png" alt="今球app官网" />
        </div>
        <div class="tab href-tab">
          <a href="/" class="tab-home">
            首页
            <em></em>
          </a>
          <a href="/app_download" class="tab-download">
            App下载
            <em></em>
          </a>
          <a href="/about" class="tab-about">
            关于我们
            <em></em>
          </a>
          <a href="/contact" class="tab-cantact">
            联系我们
            <em></em>
          </a>
        </div>
      </div>
    </div>
    <nuxt class="content" />
    <div class="wrap bottom"  v-if="!(path ==='/tg') ">
      <div>闽ICP备19005086号 | 厦门市多趣想科技有限公司</div>
      <div>地址：厦门市思明区吕岭路1585号宝龙一城4号楼2505室</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemIndex: 0,
      path:''
    };
  },
   head() {
    return {
      title: "「今球app官网」今球-今日足球资讯网",
      meta: [
        { hid: "description", name: "description", content: "今球app官网为用户提供即时足球赛事资讯,用户可在今球app官网在线观看赛事直播,原创新闻,精彩集锦等足球赛事资讯.一款专注足球赛事服务手机应用软件-今球app." },
        { hid: 'keywords', name: 'keywords', content:'今球app，今球app官网' }
        ]
    };
  },
  methods: {
    gourl(val){
      this.itemIndex = val;
    }
  },
  mounted(){
    this.path = this.$route.path;
  }
};
</script>
<style>

.tab {
  display: flex;
  justify-content: space-between;
  width: 220px;
}

.href-tab {
  margin-left: 250px;
  width: 400px;
}

.tab a {
  cursor: pointer;
  color: #171717;
  font-size: 18px;
  width: 78px;
  text-align: center;
}

.tab a.on {
  color: #fbc31f;
}

.tab a em {
  width: 28px;
  height: 3px;
  background: #fbc31f;
  color: #fbc31f;
  position: absolute;
  margin-left: -50px;
  margin-top: 30px;
  display: none;
}

.tab span {
  display: inline-block;
  width: 95px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #fbc31f;
  border: 1px solid #fbc31f;
  border-radius: 15px;
  cursor: pointer;
}

.tab span:hover {
  background: #fbc31f;
  color: #fff;
}

.header {
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(238, 238, 238, 1);
}

.descript {
  margin-top: 110px;
}

.headerin {
  height: 60px;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  color: #424242;
  font-size: 14px;
}
/* 底部 */

.bottom {
  background: #171717;
  height: 40px;
  padding: 20px 0;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.bottom div {
  margin-bottom: 5px;
}
</style>
