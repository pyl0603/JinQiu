<template>
  <div class="studio">
    <div class="live-cover">
      <i class="return-icon" @click="returnHomeFun"><a-icon type="left" /></i>
      <Video
        :url="url"
        :isLive="isLive"
        :topic="data.topic"
        :status="status"
        :poster="data.logo"
        :permnition="data.permnition"
        :avatar="streamer.avatar"
      />
    </div>
    <div class="studio-match">
      <!-- <div class="topic">{{data.topic}}</div> -->
      <div class="title" v-if="1 < matchVo.status.value &&  matchVo.status.value < 11">{{matchVo.competition}} {{matchVo.matchTime | formatTime}}</div>
      <div class="title" v-if="matchVo.status.value == 0">{{matchVo.competition}} {{matchVo.kind}}</div>
      <div class="center">
        <div class="item home">
          {{matchVo.home.name}}
          <img :src="matchVo.home.logo" alt />
        </div>
        <div class="info txt" v-if="1 < matchVo.status.value &&  matchVo.status.value < 11">
          <div class="score">
            <em :class="{ on: matchVo.score.home >  matchVo.score.away}">{{matchVo.score.home}}</em>
            -
            <em :class="{ on: matchVo.score.home < matchVo.score.away}">{{matchVo.score.away}}</em>
          </div>
        </div>
        <div class="info txt" v-if="matchVo.status.value == 0">
          VS
        </div>
        <div class="item away">
          <img :src="matchVo.away.logo" alt />
          {{matchVo.away.name }}
        </div>
      </div>
    </div>
    <div class="studio-menu">
      <a
        v-for="(item, index) in menus"
        :key="index"
        @click="changeTab(item.value, index)"
        :class="{ on: itemIndex == index }"
         >{{ item.name }}</a
        >
    </div>
    <div class="menu-content">
      <!--聊天页面-->
      <div class="chat" v-if="itemIndex === 0">
        <div class="live-announcement" v-show="isShowNotice">
          <i class="close" @click="showNotice"></i>
          直播间公告：{{data.notice || "暂时没有"}}
        </div>
        <div ref="barrage" class="live-barrage">
          <p v-for="(item, index) in message" :key="index" :class="{'live-anchor': item.userType.value === 0, 'enter-live': item.type.value === 1 || item.type.value === 2 }">
            <!--用户-->
            <span v-show="item.userType.value !== 2 && item.type.value !== 2 && item.userType.value !== 3" class="live-tag">{{item.userType.display}}</span>
            <span v-show="item.type.value !== 1 && item.userType.value !== 0 && item.userType.value !== 3" class="nickname">{{item.user.nickname}}：</span>
            <span v-show="item.type.value === 1 || item.userType.value === 0 || item.userType.value === 3">{{
              item.user.nickname + '：'
            }}</span>
            <span>{{ item.content}}</span>
          </p>
        </div>
        <div class="chat-footer">
          <div class="chat-box">
            <div v-if="!isToken" class="login-to" @click="toLoginFun">前往登录</div>
            <!-- <input v-if="isToken" placeholder="我也来说两句..." @click="showInputFun" /> -->
            <!-- <button>发送</button> -->
            <div v-if="isToken"  :class="{'chat-input':isShowInput, 'input':!isShowInput}">
              <textarea
                v-if="isToken"
                v-model="sendmsg"
                style="resize:none"
                maxlength="200"
                placeholder="我也来说两句..."
                autocomplete="off"
                @keydown="keyupFun"
                ref="focusTextarea"
               @click="showInputFun"
              />
            </div>
            <button @click="sendFun">发送</button>
          </div>
          <!-- <div class="chat-input">
            <textarea
            v-model="sendmsg"
            autofocus="autofocus"
            style="resize:none"
            maxlength="200"
            placeholder="我也来说两句..."
            autocomplete="off"
            @keydown="keyupFun"
            ref="focusTextarea"
          />
          <button @click="sendFun">发送</button>
          </div> -->
        </div>
      </div>
      <!--主播信息及预约赛事-->
      <div v-if="itemIndex === 1">
        <div class="anchor">
          <div class="anchor-info">
            <img class="icon" :src="streamer.avatar" alt="" />
            <div class="info-msg">
                <span class="nickname">{{ streamer.nickName }}</span>
                <i>房间号：{{ streamer.roomNumber }}</i>
              </div>
          </div>
          <div class="anchor-summary">主播简介：{{streamer.introduction || '无'}}</div>
        </div>
        <mbook :data="data" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import openSocket from "socket.io-client";
import Video from "@/components/Video";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { getLive, attention, cancelAttention } from "@/api/live";
import { formatTime } from "@/utils/index.js";
import mbook from "./m_book";
let socket;
export default {
  layout: "m_default",
  computed: {
    ...mapGetters(["loginTop"]),
  },
  components: {
    mbook
  },
  data() {
    return {
      url: "",
      message: [],
      isLive: false,
      sendmsg: "",
      streamer: {},
      status: 1,
      id: 20,
      data: {
        topic: "",
      },
      matchVo: { away: { }, home: {  }, status: {},score:{}},
      menus:[
        { name: "聊天", value: 0 },
        { name: "主播", value: 1 }
      ],
      itemIndex: 0,
      isShowNotice: true,
      isShowInput: false,
      isToken: false
    };
  },
  filters: {
    formatTime(time) {
      let times = time < 10000000000 ? time * 1000 : time;
      var date = new Date(times);
      return formatTime(date);
    }
  },
  methods: {
    // 发送
    sendFun() {
      const token = getToken();
      if(!token) {
        return
      }
      if (this.sendmsg.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
        this.$message.info("请输入内容");
        return;
      }
      let chMsg = { channel: this.id, content: this.sendmsg };
      socket.emit("dqx.live.send", chMsg, (res) => {
        // console.log('发送消息', res)
        this.sendmsg = "";
        this.isShowInput = false;
      });
    },
    // 评论自动向上滚动
    autoScroll() {
     if (this.$refs.barrage) {
        const e = this.$refs.barrage;
        if (e.scrollHeight > e.offsetHeight) {
          e.scrollTop = e.scrollHeight;
        }
     }
    },
    // 键盘事件
    keyupFun(e) {
      if (e.keyCode === 13) {
        this.sendFun();
      }
    },
    changeTab(val, e) {
      this.itemIndex = e;
    },
    // 显示公告
    showNotice() {
      this.isShowNotice = false
    },
    // 显示输入键盘
    showInputFun() {
      this.isShowInput = true
      // this.$nextTick(() => {
      //   this.$refs.focusTextarea.focus();
      // })
    },
    // 前往登录
    toLoginFun() {
       this.$router.push('/Personal/m_index')
    },
    returnHomeFun() {
      this.$router.push({ path: '/Home/m_index' });
    }
  },
  watch: {
    // 实时监听数据变化
    message(val) {
      this.message = val;
      this.autoScroll();
    },
    data(newVal) {
      this.data = newVal;
      this.streamer = this.data.streamer;
      this.status = this.streamer.status.value;
      const pullStreamingAddress = this.data.pullStreamingAddress;
      if (pullStreamingAddress && this.status === 1) {
        this.isLive = true;
        this.url = pullStreamingAddress
          ? pullStreamingAddress.highPullUrl
          : null;
      }
    },
  },
  mounted() {
    const token = getToken();
    this.isToken = token || false;
    this.id = this.$route.query.id;
    getLive(this.id, { protocol: 2 }).then((res) => {
      this.data = res.data;
      this.matchVo = this.data.matchVo;
      this.streamer = this.data.streamer;
      this.status = this.streamer.status.value;
      const pullStreamingAddress = this.data.pullStreamingAddress;
      if (pullStreamingAddress && this.status === 1) {
        this.isLive = true;
        this.url = pullStreamingAddress
          ? pullStreamingAddress.highPullUrl
          : null;
      }
    });
    socket = openSocket(
      `http://socket.jinqiulive.com:9999?client=admin&token=${token}`
    );
    // 连接直播间
    socket.on("connect", () => {
      let chMsg = { channel: this.id };
      // 加入直播间
      setTimeout(() => {
        socket.emit("dqx.live.channel.join", chMsg, (data) => {
        });
      }, 300);
           // 获取直播状态
        socket.on("dqx.live.room.event", (res) => {
          if (res.type.value === 1) {
            this.status = 2; // 直播暂停
            this.isLive = false;
          }
          if (res.type.value === 0) {
            this.status = 1; // 直播中
            this.isLive = true;
          }
          if (res.type.value === 2) {
            this.status = 0; // 下播 或者为开播
            this.isLive = false;
          }
          if (res.type.value === 3) {
            this.status = 3; // 禁播
            this.isLive = false;
          }
        });
        // 接收消息
        socket.on("dqx.live.receive", (res) => {
          this.message.push(res);
        });
    });
    this.autoScroll();
  },
  beforeDestroy() {
  }
};
</script>
<style>
.studio + .m-footer {
  display: none;
}
</style>
<style scoped>
.live-cover {
  /* position: relative; */
  width: 100%;
  height: 4.6rem;
  position: fixed;
  top: 0.88rem;
}
.studio-menu {
  position: fixed;
  top: 6.6rem;
}
.studio-match {
  width: 100%;
  /* height: 1.3rem; */
  padding: 0.25rem 0.5rem;
  padding-top: 0.1rem;
  position: fixed;
  top: 5.48rem;
}
.menu-content {
  width: 100%;
  /* margin: 0.25rem 0.5rem; */
  position: fixed;
  top: 7.4rem;
  max-height: calc(100vh - 3rem);
  overflow: hidden;
  overflow-y: scroll;
}
.studio-match .title {
  text-align: center;
  font-size: 0.2rem;
  color: #ADADAD;
}
.studio-match .center {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.09rem;
}
.studio-match .center .item {
  width: 2.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  font-size: 0.24rem;
  line-height: 0.44rem;
  color: #171717;
}
.studio-match .center .item.home {
  text-align: right;
}
.studio-match .center .item.away {
  text-align: left;
}
.studio-match .center .item img {
  width: .44rem;
  height: .44rem;
  border-radius: 50%;
  margin: 0 .1rem;
}
.studio-match .center .info {
  text-align: center;
}
.studio-match .center .info.txt {
  font-size: .32rem;
}
.studio-match .center .info.txt .score {
  color: #171717;
}
.studio-match .center .info.txt .score .on {
  color: #fbc013;
}
.studio-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 0.8rem;
  border-top: 0.01rem solid #EEEEEE;
  border-bottom: 0.01rem solid #CECECE;
}
.studio-menu a {
  font-size: 0.28rem;
  color: #424242;
}
.chat {
  position: relative;
}
.chat-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 0.12rem 0.3rem
}
.chat-footer .input  {
  width: 80%;
  height: 0.72rem;
  line-height: 0.72rem;
}
.chat-footer .chat-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}
.chat-footer .input textarea {
  width: 100%;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 0;
  background-color: #F0F0F0;
  border-radius: 0.36rem;
  padding-left: 0.28rem;
}
.chat-footer .login-to {
  display: inline-block;
  width: 80%;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 0;
  background-color: #FBC31F;
  border-radius: 0.36rem;
  text-align: center;
  font-size: 0.32rem;
  color: #171717;
}
.chat-footer textarea {
  width: 100%;
  height: 1.6rem;
  border: 0;
  font-size: 0.3rem;
  line-height: 0.38rem;
  color: #171717;
  background-color: #F0F0F0;
  border-radius: 0.08rem;
  padding: 0.08rem;
}
.chat-footer .chat-input {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.chat-footer button {
  font-size: .32rem;
  border: 0;
  color: #171717;
  background-color: #fff;
}
.chat-footer .chat-input + button {
  padding: 0.4rem 0.32rem;
}
.studio-menu .on {
  font-size: 0.3rem;
  color: #171717;
  font-weight: 500;
}
.live-announcement {
  position: relative;
  padding: .4rem .3rem;
  font-size: .28rem;
  line-height: .44rem;
  color: #777777;
  background-color: #F5F5F5;
}
.live-barrage .nickname {
  color: #F36F0D;
}
.live-barrage p {
  margin-bottom: .3rem;
  font-size: .28rem;
  word-wrap: break-word;
  word-break: break-all;
}
.live-tag {
  display: inline-block;
  min-width: .7rem;
  padding: .06rem 0;
  border-radius: .04rem;
  font-size: .24rem;
  color: #FFFFFF;
  background-color: #FBC31F;
  text-align: center;
}

.live-anchor .live-tag {
  background-color: #F84A38;
}
.live-barrage {
  height: calc(100vh - 10rem);
  padding: .34rem .3rem;
  font-size: .28rem;
  color: #424242;
  /* overflow-y: scroll;
  transform: translateZ(0); */
  overflow-y: scroll;
  transform: translateZ(0);
}
.enter-live {
  padding: .1rem .12rem;
  color: #1B69FB;
  background-color: #D0DFFB;
}
.live-announcement .close {
  cursor: pointer;
  position: absolute;
  right: 0.16rem;
  top: 0.16rem;
  display: inline-block;
  width: 0.26rem;
  height: 0.26rem;
  line-height: 0.26rem;
  background: url("../../static/m/ic_zbj_del.png") no-repeat center;
  background-size: 0.26rem 0.26rem;
}
.anchor {
  width: 100%;
  padding: 0.36rem 0.3rem 0.42rem 0.3rem;
  border-bottom: 0.2rem solid #F5F5F5;
}
.anchor-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 1.68rem;
  padding: 0 0.3rem;
  padding-bottom: 0.36rem;
  border-bottom: 0.01rem solid #EEEEEE;
}
.anchor-info .icon {
  width: 0.96rem;
  height: 0.96rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.anchor-info .info-msg {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}
.anchor-info .info-msg .nickname {
  color: #171717;
  font-size: 0.3rem;
  margin-bottom: 0.34rem;
}
.anchor-summary {
  font-size: 0.28rem;
  color: #777777;
  margin-top: 0.4rem;
}
.return-icon {
  position: absolute;
  top: 0.26rem;
  left: 0.2rem;
  display: inline-block;
  color: #fff;
  padding: 0.1rem;
  padding-left: 0;
  z-index: 9
}
.studio-match .topic {
  font-size: 0.26rem;
  padding-bottom: 0.08rem;
  border-bottom: 0.01rem solid #eeeeee;
}
.menu-content >>> .book-list .item {
  box-shadow: none;
  border: 0;
  border-bottom: 0.01rem solid #eeeeee;
}
</style>
