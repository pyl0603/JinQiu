<template>
  <div class="chatroom">
    <div class="live">
      <div class="live-topic">
        <div class="topic-left">
          <img class="icon" :src="streamer.avatar" alt="" />
          <div class="topic-info">
            <h2 class="title">{{ data.topic }}</h2>
            <div class="info-msg">
              <span>{{ streamer.nickName }}</span>
              <span>直播间ID:{{ data.roomNumber }}</span>
              <i>{{ streamer.hotNum }}</i>
            </div>
          </div>
        </div>
        <div class="topic-right">
          <div class="downcode">
            <i>手机观看</i>
            <img src="../../static/downcode.png" alt class="downcode-img" />
          </div>
          <div class="btns">
            <span class="btn" @click="attentionFun()">{{
              streamer.isFocused ? "取消关注" : "关注"
            }}</span>
            <span class="btn-txt">{{ streamer.concernedNum }}</span>
          </div>
        </div>
      </div>
      <div class="live-cover">
        <Video
          :url="url"
          :isLive="isLive"
          :topic="data.topic"
          :status="status"
          :poster="data.logo"
          :permnition="data.permnition"
          :avatar="streamer.avatar"
          @isPlay="isPlay"
        />
        <div class="pos-adv" v-if="isAdv&&adImg!=''">
          <div class="live-ad" v-if="adImg">
            <em class="ad-logo"></em>
            <em class="ad-close" @click="isAdv = false"></em>
            <img :src="adImg" @click="advFun(adMsg)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="chat-post">公告：{{ data.notice }}</div>
      <div class="chat-content" ref="barrage">
        <div class="chat-item" v-for="(item, index) in message" :key="index">
          {{ item.user.nickname }}：<span class="chat-item-name">{{
            item.content
          }}</span>
        </div>
      </div>
      <div class="chat-footer">
        <div class="footer-info">
          <span class="emoj" @click="showEmoji"></span>
          <span class="clean" @click="clearTxt">清屏</span>
        </div>
        <div class="footer-content">
          <textarea
            v-model="sendmsg"
            style="resize:none"
            maxlength="200"
            placeholder="我也来说两句..."
            autocomplete="off"
            @keydown="keyupFun"
          />
          <button @click="sendFun">发送</button>
        </div>
      </div>

      <div class="add-emoji" v-if="isShowEmoji">
        <span
          @click="get(item)"
          v-for="(item, index) in emojiList"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import openSocket from "socket.io-client";
import Video from "@/components/Video";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { attention, cancelAttention } from "@/api/live";
import { getCatStop } from "@/api/adv";
let socket;
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["loginTop"])
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
      isShowEmoji: false,
      isAttention: false,
      isAdv: false,
			adImg: "",
      adMsg:{resType:''},
      emojiList: [
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "☺️",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "🤯",
        "😳",
        "😱",
        "😨",
        "😰",
        "😥",
        "😓",
        "🤗",
        "🤔",
        "🤭",
        "🤥",
        "😶",
        "😐",
        "😑",
        "😬",
        "🙄",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "😴",
        "🤤",
        "😪",
        "😵",
        "🤐",
        "🤢",
        "🤮",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "🤑",
        "🤠",
        "👿",
        "👹",
        "👺",
        "🤡",
        "💩",
        "👻",
        "💀",
        "☠️",
        "👽",
        "👾",
        "🤖",
        "🎃",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "😿",
        "😾"
      ]
    };
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
    isPlay(e) {
      this.isAdv = e;
      console.log(this.isAdv);
    },
    showEmoji() {
      this.isShowEmoji = !this.isShowEmoji;
    },
    get(val) {
      this.sendmsg = this.sendmsg + val;
    },
    sendFun() {
      const token = getToken();
      if (!token) {
        this.$store.commit("user/SET_LOGINTOP", true);
        return;
      }
      if (this.sendmsg.replace(/(^\s*)|(\s*$)/g, "").length === "") {
        this.$message.info("请输入内容");
        return;
      }
      let chMsg = { channel: this.id, content: this.sendmsg };
      socket.emit("dqx.live.send", chMsg, res => {
        // console.log('发送消息', res)
        this.sendmsg = "";
        this.isShowEmoji = false;
      });
    },
    // 评论自动向上滚动
    autoScroll() {
      const e = this.$refs.barrage;
      if (e.scrollHeight > e.offsetHeight) {
        e.scrollTop = e.scrollHeight;
      }
    },
    // 键盘事件
    keyupFun(e) {
      if (e.keyCode === 13) {
        this.sendFun();
      }
    },
    // 清屏
    clearTxt() {
      this.message = [];
    },
    attentionFun() {
      const num = this.streamer.concernedNum;
      const itemId = this.streamer.userId;
      const itemLogo = this.streamer.avatar;
      const itemName = this.streamer.nickName;
      if (this.streamer.isFocused) {
        cancelAttention({ itemId: itemId }).then(res => {
          this.streamer.concernedNum = num - 1;
          this.streamer.isFocused = false;
          this.$message.info("取消关注成功！");
        });
      }
      if (!this.streamer.isFocused) {
        attention({
          itemId: itemId,
          itemLogo: itemLogo,
          itemName: itemName
        }).then(res => {
          this.streamer.concernedNum = num + 1;
          this.streamer.isFocused = true;
          this.$message.info("关注成功！");
        });
      }
    }
  },
  watch: {
    // 实时监听数据变化
    message(val) {
      this.autoScroll();
    },
    data(newVal) {
      this.data = newVal;
      this.streamer = this.data.streamer;
      this.status = this.streamer.status.value;
			const pullStreamingAddress = this.data.pullStreamingAddress;
			// 
      getCatStop(newVal.streamer.category.value).then(res => {
				this.adImg = res.data ? res.data.image : "";
				this.adMsg = res.data;
      });
      console.log(pullStreamingAddress);
      if (pullStreamingAddress && this.status === 1) {
        this.isLive = true;
        this.url = pullStreamingAddress
          ? pullStreamingAddress.highPullUrl
          : null;
      }
      console.log('url', this.url);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    socket = openSocket(
      `http://socket.jinqiulive.com:9999?client=admin&token=${getToken()}`
    );
    // 连接直播间
    socket.on("connect", () => {
      let chMsg = { channel: this.id };
      // 加入直播间
      setTimeout(() => {
        socket.emit("dqx.live.channel.join", chMsg, data => {
          console.log(data, "加入直播间");
        });
      }, 300);

      // 获取直播状态
      socket.on("dqx.live.room.event", res => {
        console.log("获取直播状态", res, res.type.value);
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
      socket.on("dqx.live.receive", res => {
        this.message.push(res);
      });
    });
    this.autoScroll();
  },
  beforeDestroy() {
    // let msg = { channel: 20 };
    // 	socket.emit("dqx.live.channel.leave", msg, (data) => {
    // 		console.log(data, "离开直播间");
    // });
  }
  // watch:{
  // 	data(newVal) {
  // 		console.log(111111111111)
  // 		this.data = newVal
  // 		this.streamer = this.data.streamer;
  // 		this.status = this.streamer.status.value;
  // 		const pullStreamingAddress =  this.data.pullStreamingAddress;
  // 		console.log(pullStreamingAddress)
  // 		if (pullStreamingAddress && this.status === 1) {
  // 				this.isLive = true
  // 				this.url = pullStreamingAddress ? pullStreamingAddress.highPullUrl:null
  // 		}
  // 		console.log(this.url)
  // 	},
  // }
};
</script>
<style scoped>
.pos-adv{
	position: absolute;
	width: 5.2rem;
	height: 2.92rem;
	margin-top: -4rem;
	margin-left: 1.8rem;
	z-index: 999;
}
.live-ad {
  width: 100%;
  height: 100%;
  position: relative;
}
.live-ad img {
  width: 100%;
  height: 100%;
}
.chatroom {
  display: flex;
  border: 0.01rem solid #eeeeee;
}
.live-topic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 9.04rem;
  padding: 0.28rem 0.1rem 0.3rem 0.2rem;
}
.topic-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.topic-info {
  margin-left: 0.21rem;
}
.topic-info .title {
  color: #171717;
  font-size: 0.22rem;
  margin-bottom: 0.12rem;
}
.icon {
  width: 0.52rem;
  height: 0.52rem;
  border-radius: 50%;
}
.live-cover {
  width: 9.04rem;
  height: 5.1rem;
}
.info-msg span {
  margin-right: 0.3rem;
}
.info-msg i {
  display: inline-block;
  height: 0.2rem;
  line-height: 0.2rem;
  padding-left: 0.2rem;
  background: url(/_nuxt/static/ic_hot.png) no-repeat left;
  background-size: 0.15rem 0.2rem;
  font-size: 0.18rem;
  color: #adadad;
  text-align: center;
}
.topic-right i {
  display: inline-block;
  height: 0.28rem;
  padding-left: 0.25rem;
  background: url("../../static/ic_phone.png") no-repeat left;
  background-size: 0.16rem 0.28rem;
  font-size: 0.16rem;
  color: #424242;
}
.topic-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btns {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 0.48rem;
  border: 0.01rem solid #eeeeee;
  border-radius: 0.08rem;
  background-color: #f5f5f5;
  margin-left: 0.26rem;
  padding-left: 0.06rem;
}
.btns .btn {
  display: inline-block;
  padding: 0.09rem 0.08rem;
  padding-left: 0.3rem;
  background: url("../../static/ic_follow.png") no-repeat left;
  background-size: 0.18rem 0.22rem;
  font-size: 0.16rem;
  color: #424242;
  border-right: 0.01rem solid #eeeeee;
}
.btns .btn-txt {
  display: inline-block;
  padding: 0 0.1rem;
  text-align: center;
  height: 0.48rem;
  line-height: 0.48rem;
  width: 0.48rem;
}
.chat {
  width: 2.95rem;
  position: relative;
  border-left: 0.01rem solid #eeeeee;
}
.chat-post {
  font-size: 0.14rem;
  color: #171717;
  line-height: 0.24rem;
  padding: 0.13rem 0.06rem 0.08rem 0.09rem;
  border-bottom: 0.01rem solid #eeeeee;
}
.chat-content {
  height: 4.8rem;
  padding: 0.17rem 0 0.12rem 0.12rem;
  padding-bottom: 0.3rem;
  font-size: 0.14rem;
  color: #171717;
  overflow-y: scroll;
  transform: translateZ(0);
}
.chat-item {
  width: 100%;
  margin-bottom: 0.14rem;
  color: #0067ff;
}
.chat-item-name {
  word-wrap: break-word;
  word-break: break-all;
  color: #171717;
}
.chat-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 0.01rem solid #eeeeee;
  border-bottom: 0.01rem solid #eeeeee;
}
.footer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #eeeeee;
  padding: 0.04rem 0.09rem;
}
.footer-info .emoj {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  background: url("../../static/ic_emoj.png") no-repeat left;
  background-size: 0.2rem 0.2rem;
  cursor: pointer;
}
.footer-info .clean {
  display: inline-block;
  height: 0.2rem;
  padding-left: 0.3rem;
  background: url("../../static/ic_clean.png") no-repeat left;
  background-size: 0.2rem 0.2rem;
  cursor: pointer;
}
.footer-content {
  display: flex;
}
.footer-content textarea {
  width: 2.35rem;
  height: 0.52rem;
  border: 0;
  font-size: 0.14rem;
  line-height: 0.24rem;
  background: #fff;
  padding: 0.02rem;
}
.footer-content button {
  width: 0.6rem;
  height: 0.52rem;
  font-size: 0.16rem;
  color: #171717;
  background-color: #fbc31f;
  border: 0;
}
textarea::-webkit-input-placeholder {
  color: #adadad;
}
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #adadad;
}
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #adadad;
}
textarea:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #adadad;
}
/*chrome--------------------------------------------start*/
.footer-content textarea::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
/* Track */
.footer-content textarea::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 8px;
}
/* Handle */
.footer-content textarea::-webkit-scrollbar-thumb {
  background: #fbc31f;
  border-radius: 8px;
}
.footer-content textarea::-webkit-scrollbar,
.footer-content textarea::-webkit-scrollbar {
  display: none;
}
.footer-content textarea::-webkit-scrollbar,
.footer-content textarea:hover::-webkit-scrollbar {
  display: block;
}
/*chrome--------------------------------------------start*/
.chat-content::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}
/* Track */
.chat-content::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 8px;
}
/* Handle */
.chat-content::-webkit-scrollbar-thumb {
  background: #fbc31f;
  border-radius: 8px;
}
/* Handle on hover */
.chat-content::-webkit-scrollbar-thumb:hover {
  background: #fbc31f;
}
.chat-content::-webkit-scrollbar,
.chat-content::-webkit-scrollbar {
  display: none;
}
.chat-content::-webkit-scrollbar,
.chat-content:hover::-webkit-scrollbar {
  display: block;
}
/*chrome--------------------------------------------end*/
/*IE--------------------------------------------start*/
* {
  /*三角箭头的颜色*/
  scrollbar-arrow-color: #c0c4cc;
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: #fbc31f;
  /*滚动条整体颜色*/
  scrollbar-highlight-color: #fbc31f;
  /*滚动条阴影*/
  scrollbar-shadow-color: #a2a2a3;
  /*滚动条轨道颜色*/
  scrollbar-track-color: #fbc31f;
  /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  scrollbar-3dlight-color: #a2a2a3;
  /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  scrollbar-darkshadow-color: #a2a2a3;
  /*滚动条基准颜色*/
  scrollbar-base-color: #f4f4f5;
}
.downcode {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.downcode-img {
  z-index: 3;
  position: absolute;
  bottom: -1.38rem;
  left: auto;
  background: #fbc31f;
  width: 1.28rem;
  height: 1.28rem;
  border-radius: 4px;
  padding: 0.02rem;
  display: none;
}
.downcode:hover > .downcode-img {
  display: block;
}
.add-emoji {
  padding: 0.1rem;
  background: #ffffff;
  position: absolute;
  margin-top: -1.8rem;
}
.add-emoji span {
  display: inline-block;
}
</style>
