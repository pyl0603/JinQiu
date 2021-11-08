<template>
  <div>
    <div class="title">12121</div>
    <video
      id="videobox"
      class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
      controls
      preload="auto"
      webkit-playsinline="true"
      x5-video-player-type="h5"
      x5-video-orientation="portraint"
      playsinline="true"
      type="application/x-mpegURL"
      allowsInlineMediaPlayback="YES"
      webview.allowsInlineMediaPlayback="YES"
      width="100%"
      ref="videoRef"
      x5-video-player-fullscreen="true"
    >
      <source id="sourceBox" :src="videoSrc" />
      <p class="vjs-no-js">不支持播放</p>
    </video>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  name: "VideoExample",
  data() {
    return {
      videoSrc:
        "http://cdn-pull-hls.jinqiulive.com/live/68dc3a50b33b478e860bedadc6f1f9bb_720/playlist.m3u8?wsSecret=81ddde006b43adf6ee45068885391188&wsTime=1600679394",
      posterSrc:
        "https://matrimony001.100msh.net.cn/public/code/material/mp-7261-1554175849.jpg",
      isError: false
    };
  },

  mounted() {
    let _this = this;
    //为避免在初始化video时播放源是空的，报播放源错误，需要先给source 的src赋值
    var player = videojs("videobox", {
      bigPlayButton: true,
      textTrackDisplay: true,
      posterImage: true,
      errorDisplay: false,
      controlBar: false,
      playbackRates: [0.5, 1, 1.5, 2],
      ControlBar: {
        customControlSpacer: true
      }
    });
    // player.width(this.videoW)   //设置播放器宽度
  },
  methods: {
    onPlayerReady() {
      this.play();
      setTimeout(() => {
        //延时确保能监听到视频源错误
        var mediaError = this.error();
        if (mediaError != null && mediaError.code) {
          _this.isError = true;
          Dialog.alert({
            message:
              "啊哦，播放出错了。<br>请刷新重试，如无法播放建议您观看其它内容。",
            confirmButtonText: "确定"
          }).then(() => {
            _this.goback();
          });
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.title {
  position: fixed;
  z-index: 999;
  top: 30px;
  color: red;
}
</style>
