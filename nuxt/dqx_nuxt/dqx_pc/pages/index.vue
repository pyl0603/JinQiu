<template>
  <div class="content">
    <!-- 频道列表-->
    <div class="channel">
      <div class="title">频道</div>
      <div class="list">
        <div class="item" v-for="item in fChannel" :key="item.id" @click="getCList(item.id)">
          <span>
            <img :src="item.url"  :alt="item.channelName" v-if="item.url != ''"/>
            <img src="https://duoquxiang.oss-cn-shenzhen.aliyuncs.com/picture/2019-12-31/6db5c7e924ef49b5816bee2ff5588145.png"  :alt="item.channelName" v-if="item.url == ''"/>
          </span>
          <em>{{item.channelName | fchannelName}}</em>
        </div>
        <div class="item" v-for="item in bChannel" :key="item.id" @click="getCList(item.id)">
          <span>
            <img :src="item.url"  :alt="item.channelName" v-if="item.url!=''"/>
            <img src="https://duoquxiang.oss-cn-shenzhen.aliyuncs.com/picture/2019-12-31/6db5c7e924ef49b5816bee2ff5588145.png"  :alt="item.channelName" v-if="item.url == ''"/>
          </span>
          <em>{{item.channelName | bchannelName}}</em>
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="right">
      <div class="swiper-container" ref="swiper" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in fBannerList" :key="index">
            <img :src="item.image"  :alt="item.summary" class="slide-img" />
            <span>
              <em>{{item.summary}}</em>
              <em>{{1+index++}}/{{fBannerList.length+bBannerList.length}}</em>
            </span>
          </div>
          <div class="swiper-slide" v-for="(item,index) in bBannerList" :key="index+5">
            <img :src="item.image"  :alt="item.summary" class="slide-img" />
            <span>
              <em>{{item.summary}}</em>
              <em>{{fBannerList.length+1+index++}}/{{fBannerList.length+bBannerList.length}}</em>
            </span>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="article">
        <div class="item" v-for="item in list" :key="item.id" @click="goDet(item.id)">
          <img :src="item.imageUrl"  :alt="item.title" />
          <div>
            <span>{{item.title}}</span>
            <em>{{item.publishTime | formatTime}}</em>
          </div>
        </div>
      </div>
      <!-- 为空 -->
      <div class="no-result" v-if="list.length == 0">
        <img src="~assets/img/list_no.png" alt />
        <span>该频道暂无新闻</span>
      </div>
      <!-- 上一页下一页 -->
      <div class="change-page">
        <span v-if="page != 1" @click="page--">←上一页</span>
        <span v-if="hasNext" @click="page++">下一页→</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formatTime } from "@/assets/js/index.js";
// const baseUrl = `http://192.168.1.200:9000/client-app`;
const baseUrl = `https://api.jinqiulive.com/client-app`
export default {
  data() {
    return {
      list: [],
      defaultImg: 'this.src="https://duoquxiang.oss-cn-shenzhen.aliyuncs.com/picture/2019-12-31/6db5c7e924ef49b5816bee2ff5588145.png"',
      page: 1,
      channelId: 2,
      fBannerList: [],
      bBannerList: [],
      fChannel: [],
      bChannel: [],
      hasNext: true,
      swiperOption: {
        effect: "fade",
        loop: true,
        // autoplay: true, //可选选项，自动滑动
        // delay: 6000,
        notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        mousewheel: false, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
        mousewheelControl: false, //同上
        autoplay: {
          delay: 3000
          // disableOnInteraction: false
        }
      }
    };
  },
  filters: {
    fchannelName(channel) {
      if (channel == "头条") {
        return "足球头条";
      }
      if (channel == "视频") {
        return "足球视频";
      }
      return channel;
    },
    bchannelName(channel) {
      if (channel == "头条") {
        return "篮球头条";
      }
      if (channel == "视频") {
        return "篮球视频";
      }
      return channel;
    },
    formatTime(time) {
      var date = new Date(time);
      return formatTime(date);
    }
  },
  async asyncData(context) {
    let [dataA, dataB, dataC, dataD, listE] = await Promise.all([
      axios({
        method: "get",
        headers: { Category: 0 },
        url: baseUrl + `/user/channels?type=main`
      }),
      axios({
        method: "get",
        headers: { Category: 0 },
        url: baseUrl + `/settings/banner`
      }),
      axios({
        method: "get",
        headers: { Category: 1 },
        url: baseUrl + `/user/channels?type=main`
      }),
      axios({
        method: "get",
        headers: { Category: 1 },
        url: baseUrl + `/settings/banner`
      }),
      axios({
        method: "get",
        params: { channel: 2, page: 1, page_size: 10, hasRandom: false },
        url: baseUrl + `/article/list`
      })
    ]);
    console.log(dataA.data.data)
    return {
      fChannel: dataA.data.data,
      fBannerList: dataB.data.data,
      bChannel: dataC.data.data,
      bBannerList: dataD.data.data,
      list: listE.data.data,
      hasNext: listE.data.meta.pagination.hasNext
    };
  },
  methods: {
    // 根据频道请求接口
    async getCList(val) {
      this.channelId = val;
      this.page = 1;
    },
    // 获取列表
    async getList() {
      this.$axios({
        methods: "get",
        url: baseUrl + `/article/list`,
        params: { channel: this.channelId, page: this.page, hasRandom: false }
      }).then(res => {
        this.list = res.data.data;
        this.hasNext = res.data.meta.pagination.hasNext;
      });
    },
    // 获取详情
    async goDet(val) {
      this.$router.push({ name: "articleDet", query: { id: val } });
    }
  },
  computed: {
    dataList() {
      return [this.page, this.channelId];
    }
  },
  watch: {
    dataList(newVal) {
      this.getList();
    }
  }
};
</script>

<style>
.tab-home em{
  display: inline-block!important;
  margin-left: -32px!important;
}
.swiper-container {
  width: 640px;
  height: 320px;
  margin: 0;
  margin-bottom: 10px;
}
.swiper-container img {
  width: 640px;
  height: 320px;
}
.swiper-container span {
  display: block;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 99;
  top: -40px;
  color: #fff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.content {
  min-height: calc(100vh - 160px);
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.channel {
  width: 220px;
  margin-right: 30px;
  margin-left: 80px;
}
.channel .title {
  padding-bottom: 10px;
  border-bottom: 4px solid #fbc31f;
  color: #171717;
  font-size: 20px;
}
.channel .list {
  overflow-y: scroll;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.channel .list::-webkit-scrollbar {
  display: none;
}
.channel .list .item {
  display: block;
  height: 48px;
  line-height: 47px;
  border-top: 1px solid #f0f0f0;
  padding-left: 15px;
  cursor: pointer;
}
.channel .list .item img {
  height: 24px;
  position: relative;
  top: 12px;
}
.channel .list .item span {
  display: inline-block;
  width: 60px;
  text-align: center;
}
.article .item {
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  width: 640px;
  cursor: pointer;
}
.article .item+.item{
  border-top: 1px solid #eee;
}
.article .item img {
  width: 158px;
  height: 104px;
  margin-right: 20px;
}
.article .item span {
  display: block;
  height: 60px;
  line-height: 30px;
  font-size: 20px;
  color: #171717;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article .item em {
  display: block;
  color: #adadad;
  font-size: 16px;
  margin-top: 20px;
}
.change-page {
  margin: 30px 0;
  text-align: center;
  font-size: 18px;
  color: #888888;
}
.change-page span {
  cursor: pointer;
}
.change-page span + span {
  margin-left: 30px;
}
.no-result {
  text-align: center;
  margin-top: 116px;
}
.no-result span {
  display: block;
  font-size: 16px;
  color: #adadad;
  margin-top: 20px;
}
.no-result img {
  width: 400px;
  height: 164px;
}
</style>
