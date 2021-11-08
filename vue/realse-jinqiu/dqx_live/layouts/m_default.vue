<template>
  <div class="m-cont">
    <div class="tips">
      <div class="tips-left ">
        <img src="../static/m/logos.png" alt=" " />
        <div>
          <span>今球</span>
          <em>今天的足球篮球资讯你get了吗？</em>
        </div>
      </div>
      <div class="tips-right">
        <!-- <a href="myapp://jinqiu/open" @click="goApp">打开今球APP</a> -->
        <em @click="submitFn">打开</em>
      </div>
    </div>
    <Nuxt class="m-type-area" />
    <div class="m-footer">
      <a
        class="live"
        :class="{ on: itemIndex == '/Home/m_index' }"
        @click="tabFun('/Home/m_index')"
        >直播</a
      >
      <a
        class="sch"
        :class="{ on: itemIndex == '/Schedule/m_index' }"
        @click="tabFun('/Schedule/m_index')"
        >赛程</a
      >
      <a
        class="my"
        :class="{ on: itemIndex == '/Personal/m_index' }"
        @click="tabFun('/Personal/m_index')"
        >我的</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemIndex: "/Home/m_index"
    };
  },
  mounted() {
    this.itemIndex = this.$route.path;
    console.log("22", this.itemIndex, this.$route.path);
    window.onload = function() {
      // 阻止双击放大
      var lastTouchEnd = 0;
      document.addEventListener("touchstart", function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener(
        "touchend",
        function(event) {
          var now = new Date().getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );

      // 阻止双指放大
      document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
      });
    };
  },
  head() {
    return {
      title: "今球-一个看球的专业平台",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "人人都想看的直播平台"
        }
      ]
    };
  },
  methods: {
    goApp() {
      console.log("myapp://jinqiu/open");
      window.location.href = "myapp://jinqiu/open";
    },
    tabFun(val) {
      this.itemIndex = val;
      this.$router.push({ path: `${val}` });
    },
    openApp(src) {
      // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
      // 否则打开a标签的href链接
      let ifr = document.createElement("iframe");
      ifr.src = src;
      ifr.style.display = "none";
      document.body.appendChild(ifr);
      window.setTimeout(function() {
        document.body.removeChild(ifr);
      }, 2000);
    },
    submitFn() {
      //判断浏览器
      var u = navigator.userAgent;
      if (/MicroMessenger/gi.test(u)) {
        window.location.href = "https://api.jinqiulive.com/download/app";
        return;
      }
      var d = new Date();
      var t0 = d.getTime();
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        //Android
        if (this.openApp("myapp://jinqiu/open")) {
          this.openApp("myapp://jinqiu/open");
        } else {
          //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
          var delay = setInterval(function() {
            var d = new Date();
            var t1 = d.getTime();
            if (t1 - t0 < 3000 && t1 - t0 > 2000) {
              window.location.href = "https://api.jinqiulive.com/download/app";
            }
            if (t1 - t0 >= 3000) {
              clearInterval(delay);
            }
          }, 1000);
        }
      } else if (u.indexOf("iPhone") > -1) {
        window.location.href = "https://m.jinqiulive.com/home";
        setTimeout(function() {
          let hidden =
            window.document.hidden ||
            window.document.mozHidden ||
            window.document.msHidden ||
            window.document.webkitHidden;
          if (typeof hidden == "undefined" || hidden == false) {
            window.location.href = "https://api.jinqiulive.com/download/app";
          }
        }, 50);
        // if (this.openApp("https://m.jinqiulive.com/home")) {
        //   this.openApp("https://m.jinqiulive.com/home");
        // } else {
        //   var delay = setInterval(function() {
        //     var d = new Date();
        //     var t1 = d.getTime();
        //     if (t1 - t0 < 3000 && t1 - t0 > 2000) {
        //       window.location.href = "https://api.jinqiulive.com/download/app";
        //     }
        //     if (t1 - t0 >= 3000) {
        //       clearInterval(delay);
        //     }
        //   }, 1000);
        // }
      }
    },
    getDownload() {
      let app = navigator.userAgent;
      let mobile = !!app.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
      let ios = !!app.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      let android = app.indexOf("Android") > -1 || app.indexOf("Linux") > -1; // android终端
      console.log(mobile, ios, android);
      if (mobile && ios) {
        window.location.href = "https://m.jinqiulive.com/home";
        return;
      }
      if (android) {
        window.location.href = "android://com.dqx.haoqiu/open";
        return;
      }
      setTimeout(() => {
        window.location.href = "https://api.jinqiulive.com/download/app";
      }, 2000);
    }
  },
  watch: {
    $route(to, from) {
      this.itemIndex = to.path;
    }
  }
};
</script>
<style>
/*css重置样式*/

/* body {
  max-width: 576px;
  margin: 0 auto;
  padding: 0;
} */
.m-type-area {
  margin-top: 0.88rem;
  padding-bottom: 1rem;
}
.tips {
  padding: 0 4%;
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;
  z-index: 9;
}

.tips-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.tips img {
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 0.12rem;
  margin-right: 0.2rem;
}

.tips-left span {
  display: block;
  font-size: 0.28rem;
  color: #171717;
}

.tips-left em {
  display: block;
  font-size: 0.24rem;
  color: #424242;
}

.tips-right em {
  width: 1.2rem;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  background: #18ce94;
  border-radius: 0.08rem;
  color: #fff;
  font-size: 0.23rem;
  display: inline-block;
}
.m-cont {
  max-width: 768px;
  margin: 0 auto;
  padding: 0;
}
.m-footer {
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  left: 0;
  max-width: 768px;
  margin: 0 auto;
  padding: 0;
  height: 0.98rem;
  background: #ffffff;
  box-shadow: 0px -1px 0px 0px #ebedee;
  z-index: 9;
}
.m-footer a {
  display: inline-block;
  width: 0.5rem;
  padding-top: 0.42rem;
  font-size: 0.2rem;
  color: #777777;
  text-align: center;
  /* height: .2rem;
  padding-top: .52rem;
  font-size: .18rem; */
}
.m-footer .live {
  background: url("../static/m/ic_home_zhibo_nor.png") no-repeat top center;
  background-size: 0.44rem 0.42rem;
}
.m-footer .live.on {
  background: url("../static/m/ic_home_zhibo.png") no-repeat top center;
  background-size: 0.44rem 0.42rem;
  color: #171717;
}
.m-footer .sch {
  background: url("../static/m/ic_saishi_nor.png") no-repeat top center;
  background-size: 0.44rem 0.42rem;
}
.m-footer .sch.on {
  background: url("../static/m/ic_saishi.png") no-repeat top center;
  background-size: 0.44rem 0.42rem;
  color: #171717;
}
.m-footer .my {
  background: url("../static/m/ic_me_nor.png") no-repeat top center;
  background-size: 0.44rem 0.42rem;
}
.m-footer .my.on {
  background: url("../static/m/ic_me.png") no-repeat top center;
  background-size: 0.44rem 0.42rem;
  color: #171717;
}
@media (max-width: 576px) {
  html {
    font-size: 13.33vw;
  }
}
@media (min-width: 576px) and (max-width: 768px) {
  html,
  body {
    font-size: 76.8px;
  }
}
</style>
