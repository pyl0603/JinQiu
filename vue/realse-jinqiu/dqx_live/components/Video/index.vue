<template>
  <div class="live-video">
    <!-- <div class="video-topic" :class="{'video-topic-bg': isShowTopic}">
       <i class="return-icon" @click="returnHomeFun"><a-icon type="left" /></i> -->
		  <!-- <div v-show="isShowTopic">{{topic}}</div>
    </div> --> 
    <Item :url="url" :isLive="isLive" @status="statusFun($event)" />
    <img v-show="!isLive" class="live-bg" :src="poster" />
		<div v-show="!isLive"  class="live-permnition">
			<img class="live-logo" :src="avatar">
			<div class="live-txt">
				<p v-show="status === 2">主播休息中...<br/>请稍后哦</p>
				<p v-show="status === 0 || status === 1">{{(permnition ==  null || permnition == '') ? '主播未开播' : permnition}}</p>
				<p v-show="status === 3">主播禁播中</p>
			</div>
		</div>
    <!-- <div v-show="isplay" class="adv">广告</div> -->
  </div>
</template>
<script>
import Item from './Item';
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
      isShowTopic: true,
      isFirst: false
    };
  },
  methods: {
    // 是否显示标题
		// showTopic() {
    //   this.isShowTopic = !this.isShowTopic
    // },
    statusFun(obj) {
      console.log(obj)
      if (this.isFirst) {
        this.isShowTopic = true
        this.isFirst = false
        setTimeout(()=>{
          this.isShowTopic = false
        }, 10000)
        return;
      }
      this.isplay = obj.isplay
      this.isShowTopic = obj.isShowTopic
      this.$emit('isPlay',obj.isplay)
    },
    returnHomeFun() {
      this.$router.push({ path: '/Home/m_index' });
    }
  },
  mounted() {
    this.isFirst = true
  },
  watch: {
    url(newVal) {
      console.log('==>', newVal)
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
.video-container >>> .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .video-container >>> .video-js.vjs-fluid {
  height: 100%;
} */
.video-container {
  width: 100%;
  height: 100%;
}
.live-video {
  position: relative;
  width: 100%;
  height: 100%;
}
.video-topic {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    padding: .3rem;
    padding-left: 0.6rem;
    color: #fff;
    font-size: .38rem;
    width: 100%;
    box-sizing: border-box;
}
.video-topic-bg {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(56, 31, 31, 0.73));
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
.return-icon {
  display: inline-block;
  color: #fff;
  padding-right: 0.1rem;
}

</style>
