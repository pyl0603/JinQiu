import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player/dist/ssr'
import hls from 'videojs-contrib-hls'

import Videojs from 'video.js'
import css from 'video.js/dist/video-js.css'

// videojs language
Videojs.addLanguage('zh-CN', {
    Pause: '暂停',
    Play: '播放',
    Mute: '音量',
    Fullscreen: '放大',
    'Non-Fullscreen': '缩小',
    // something...
})

Vue.use(hls)
Vue.use(VueVideoPlayer,css)
