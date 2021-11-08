<template>
  <div class="room">
    <!-- 头部 -->
    <div class="chatroom">
      <Chatroom :data="data" />
    </div>
    <!-- 中部 -->
    <div class="live-about">
      <!-- 直播事件 -->
      <div class="room-event item">
        <div class="match-top">
            <div class="title">{{matchVo.competition}} {{matchVo.matchTime | formatTime}}</div>
            <div class="center">
                <div class="item home">
                    {{matchVo.home.name}}
                    <img :src="matchVo.home.logo" alt="">
                </div>
                <div class="info txt" v-if="1 < matchVo.status.value &&  matchVo.status.value < 11">
                    <!-- <span>{{matchVo.status.display}}<em>{{matchVo.cup}}</em></span> -->
                    <div class="score">
                        <em>{{matchVo.score.home}}</em>
                        -
                        <em>{{matchVo.score.away}}</em>
                    </div>
                </div>
                <!-- <div v-else class="info dateTime">
                    <em>{{matchVo.status.display}}</em>
                </div> -->
                <div class="item away">
                    <img :src="matchVo.away.logo" alt="">
                    {{matchVo.away.name }}
                </div>
            </div>
        </div>
        <div class="choose-item">
          <a
            v-for="(item, index) in items"
            :key="index"
            @click="changeTab(item.value, index)"
            :class="{ on: itemIndex == index }"
            >{{ item.name }}</a
          >
        </div>
        <TextLive
          ref="TextLive"
          :matchVo="matchVo"
          :category="category"
          :is="currentTab"
        ></TextLive>
      </div>
      <!-- 预约赛程 -->
      <div class="book">
        <Book :data="data"/>
      </div>
    </div>
  </div>
</template>
<script>
import Book from "./book.vue";
import Event from "./event.vue";
import TextLive from "./textLive.vue";
import BTextLive from "./btLive.vue";
import Situation from "./situation.vue";
import BSit from './Bsit.vue'
import Lineup from "./lineup.vue";
import Total from "./total.vue";
import Chatroom from "./chatroom.vue";
import { getLive } from "@/api/live";
import { formatTime } from "@/utils/index.js";
export default {
  data() {
    return {
      items: [],
      itemIndex: 0,
      currentTab: "TextLive",
      id: 0,
      data: {},
      matchVo: { away: { }, home: {  }, status: {},score:{}},
      category: null
    };
  },
  components: {
    Book,
    Event,
    TextLive,
    Lineup,
    Situation,
    Total,
    BTextLive,
    BSit,
    Chatroom
  },
   filters: {
    formatTime(time) {
      let times = time < 10000000000 ? time * 1000 : time;
      var date = new Date(times);
      return formatTime(date);
    }
  },
  created() {
    // { name: "文字直播", value: "TextLive" },
    //     { name: "本场赛况", value: "Situation" },
    //     { name: "本场事件", value: "Event" },
    //     { name: "首发阵容", value: "Lineup" },
    //     { name: "本场统计", value: "Total" }
  },
  methods: {
    changeTab(val, e) {
      this.currentTab = val;
      this.itemIndex = e;
    },
    // 获得直播间详情
    async getLiveDetail(id, parmas) {
      const res = await getLive(id, parmas);
      if (res.data.code === 949) {
        this.isLive = false;
        return;
      }
      this.data = res.data;
    }
  },
  created() {
    this.id = this.$route.query.id;
    getLive(this.id, { protocol: 2 }).then(res => {
      this.data = res.data;
      this.matchVo = res.data.matchVo;
      console.log(this.matchVo)
      this.category = res.data.streamer.category.value;
      if (this.category == 0) {
        this.items = [
          { name: "文字直播", value: "TextLive" },
          { name: "本场赛况", value: "Situation" },
          { name: "本场事件", value: "Event" },
          { name: "首发阵容", value: "Lineup" }
        ];
        this.currentTab = 'TextLive'
      } else {
        this.items = [
          { name: "文字直播", value: "BTextLive" },
          { name: "本场赛况", value: "BSit" },
          { name: "本场统计", value: "Total" }
        ];
        this.currentTab = 'BTextLive'
      }
    });
  }
};
</script>
<style scoped>
.match-top {
  border-bottom: 1px solid #EEEEEE;
  /* padding-bottom:.3rem; */
  margin-bottom: .3rem;
  padding: 0 .5rem .3rem .5rem;
}
.match-top .title {
    text-align: center;
    color: #AEAEAE;
    /* color: #ffffff; */
    font-size: .16rem;
}

.match-top .center {
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .52rem;
    /* margin-top: .3rem; */
}

.match-top .center .item {
  display: flex;
  align-items: center;
    text-align: center;
    font-size: .24rem;
    color: #000;
    width: 2.4rem;
    /* margin-top: .3rem; */
}
.match-top .center .item:first-child{
  justify-content: flex-end;
}
.match-top .center .item img {
    width: .52rem;
    height: .52rem;
    border-radius: 50%;
    margin: 0 .2rem;
}

.match-top .see-btn {
    width: 100%;
    text-align: center;
    height: .6rem;
    line-height: .3rem;
}

.match-top .see-btn span {
    display: inline-block;
    width: 1.5rem;
    text-align: center;
    height: .56rem;
    line-height: .56rem;
    font-size: .28rem;
    /* color: #ffffff; */
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: .08rem;
}

.match-top .center .info {
    text-align: center;
}

.match-top .center .info.txt span {
    display: block;
    font-size: .3rem;
    /* color: #fff; */
}

.match-top .center .info.dateTime span {
    display: block;
    /* color: #ffffff; */
    /* font-size: .3rem; */
    margin-top: .3rem;
}

.match-top .center .info.dateTime em {
    display: block;
    /* color: #fff; */
    /* font-size: .3rem; */
    line-height: .3rem;
    margin-top: .5rem;
}

.match-top .center .info.txt .score {
    font-size: .24rem;
    /* color: #ffffff; */
    margin-top: .24rem;
    color: #000;
}

.live-about {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;
}
.room-event {
  width: 9.04rem;
  text-align: center;
}
.book {
  width: 2.97rem;
}
.choose-item a {
  display: inline-block;
  width: 0.88rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(173, 173, 173, 1);
  border-radius: 0.06rem;
  font-size: 0.16rem;
  color: #424242;
  margin-left: 0.4rem;
}
.choose-item a.on {
  background: rgba(251, 195, 31, 1);
  border: 1px solid rgba(251, 195, 31, 1);
  color: #ffffff;
}
/*滚动条*/
.scroll {
  height: 7.6rem;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 0.06rem;
  padding-right: 0.02rem;
}
/*chrome--------------------------------------------start*/
.scroll::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}
/* Track */
.scroll::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 8px;
}
/* Handle */
.scroll::-webkit-scrollbar-thumb {
  background: #fbc31f;
  border-radius: 8px;
}
/* Handle on hover */
.scroll::-webkit-scrollbar-thumb:hover {
  background: #fbc31f;
}
.scroll::-webkit-scrollbar,
.scroll::-webkit-scrollbar {
  display: none;
}
.scroll::-webkit-scrollbar,
.scroll:hover::-webkit-scrollbar {
  display: none;
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
</style>
