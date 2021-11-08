<template>
  <div v-show="isLive" class="videojs">
    <!-- <div ref="videoElement" class="video-container" v-video-player:myVideoPlayer="playerOptions" @ready="onPlayerReady($event)" webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-orientation="portraint"></div> -->
    <video ref="videoElement" 
    class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
    webkit-playsinline="true"
    x5-video-player-type="h5"
    x5-video-orientation="portraint"
    playsinline="true"
    >
      <source id="sourceBox" :src="url" />
      <p class="vjs-no-js">不支持播放</p>
    </video>
  </div>
</template>
<script>
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  props:{
    url:{
      type:String,
    },
    topic:{
      type:String
    },
    poster: {
      type:String
    },
    isLive: {
      type: Boolean, // 是否正在直播
      default: true
    },
    avatar: {   // 头像
      type:String
    },
    permnition: { 
      type: String,
      default: '主播还没有上线'
    },
    status: { // 状态
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      urls:'',
      isplay: false,
      playsinline: true,
      playerOptions: {
        techOrder: ['html5'],
        autoplay: true,
        muted: true, 
        language: 'zh-CN',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        // poster: this.poster,
        errorDisplay: true,
        hls: true,
        preload: 'auto',
        playsinline:true,
        webkitPlaysinline: true,
        controls: true,  //控制条
        notSupportedMessage: '请稍后再试',
        sources: [
            {
            type: "application/x-mpegURL",
            src: this.url
          }
        ]
      },
      isShowTopic: false,
    };
  },
  methods: {
    // 是否显示标题
		// showTopic() {
    //   this.isShowTopic = !this.isShowTopic
    // },
    // onPlayerReady(player) {
    //   player.on('pause', () => {
    //     this.isShowTopic = false
    //     this.isplay = false
    //     this.$emit("status", {
    //       isShowTopic: true,
    //       isplay: true
    //     })
    //   })
    //    player.on('play', () => {
    //      console.log('播放')
    //     this.isShowTopic = false
    //     this.isplay = false
    //       this.$emit("status", {
    //       isShowTopic: false,
    //       isplay: false
    //     })
    //   })
    //   player.on('click', () => {
        
    //   })
    // },
  },
  mounted() {
    setTimeout(() => {
      let player = videojs(this.$refs.videoElement, this.playerOptions, function onPlayerReady() {
						videojs.log('Your player is ready!');
      })
      player.on('pause', () => {
        this.isShowTopic = false
        this.isplay = false
        this.$emit("status", {
          isShowTopic: true,
          isplay: true
        })
      })
       player.on('play', () => {
         console.log('播放')
        this.isShowTopic = false
        this.isplay = false
          this.$emit("status", {
          isShowTopic: false,
          isplay: false
        })
      })
    }, 500)
  },
  watch: {
    url(newVal) {
      console.log('new', newVal)
      this.playerOptions.sources[0].src = newVal
      this.url = newVal;
    }
  }
};
</script>
<style scoped>
/* .video-container >>> .vjs-subs-caps-button,
.video-container >>> .vjs-playback-rate,
.video-container >>> .vjs-audio-button,
.video-container >>> .vjs-progress-control {
  display: none;
} */
/* .video-container >>> .vjs-fullscreen-control {
  position: absolute;
  right: 0;
} */
/* .videojs >>> .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
 .videojs >>>.video-js .vjs-playback-rate {
  display: none;
}
.videojs >>> .video-js.vjs-fluid {
  height: 100%;
}
.videojs {
  width: 100%;
  height: 100%;
}
.live-video {
  position: relative;
  width: 100%;
  height: 100%;
}
.videojs {
  height: 100%;
}
.video-topic {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    padding: .3rem;
    color: #fff;
    font-size: .38rem;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(23, 23, 23, 0.73));
}
.live-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.live-logo {
    width: .96rem;
    height: .96rem;
    border-radius: 50%;
}
.live-permnition {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: .26rem;
    z-index: 1;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: .2rem;
    border-radius: .08rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
}

.live-txt {
    margin-left: .22rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}
.adv {
   position: absolute;
    top: 50%;
    left: 50%;
    font-size: .26rem;
    z-index: 1;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 1px solid;
}
</style>
