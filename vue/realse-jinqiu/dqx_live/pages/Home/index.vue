<template>
  <div class="home">
    <div class="home-player">
      <div class="cover" @click="toRoomTop(streamer)">
        <i class="cover-icon">
          <span>进入直播间</span>
        </i>
        <Video :url="url" :isLive="isLive" :topic="data.topic" :status="status" :poster="data.logo" :permnition="data.permnition" :avatar="streamer.avatar" />
      </div>
      <div class="line">
        <div class="line-item" v-for="(item, index) in bannerList" :key="index" @click="toRoom(item)">
          <img :src="item.image" />
          <span class="line-item-title">{{ item.summary }}</span>
        </div>
      </div>
    </div>
    <div class="right-border-title game">
      赛事
      <div class="tab">
        <a
          v-for="(item, index) in items"
          :key="index"
          @click="changeTab(item.value, index)"
          :class="{ on: itemIndex == index }"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="swiper-container-warp"
    >
      <div
      v-if="scheduleList.length"
      v-swiper:mySwiper="swiperOption"
      class="swiper-container"
      ref="mySwiper"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in scheduleList"
            :key="index"
            @click="toSchedule(item)"
          >
            <div class="slide-title">
              <span class="race-name" :title="item.competition">{{item.competition }}</span>
              <span :class="{'on': item.onLiving}" v-if="item.onLiving">直播中</span>
              <span v-if="!item.onLiving">{{item.matchTime | formatTime}}</span>
            </div>
            <div class="slide-content">
              <div class="content-left">
                {{ item.matchTime | timeToDate }}
              </div>
              <div class="content-right">
                <div class="content-item">
                  <i class="icon">
                    <img :src="item.home.logo" />
                  </i>
                  <span :title="item.home.name">{{ item.home.name }}</span>
                </div>
                <div class="content-item">
                  <i class="icon">
                    <img :src="item.away.logo" />
                  </i>
                  <span :title="item.away.name">{{ item.away.name }}</span>
                </div>
              </div>
            </div>
          </div> 
          <div class="swiper-slide more" @click="moreSchedule" v-if="scheduleList.length" > 9">
            <i>更多赛程</i>
          </div>
        </div>
      </div>
      <div v-if="scheduleList.length > 0" class="swiper-button-prev" @click="prev"></div>
      <div v-if="scheduleList.length > 0" class="swiper-button-next" @click="next"></div>
    </div>
    <div class="anchor">
      <div class="anchor-adv">
        <img src="../../static/banners.png" />
      </div>
      <div class="anchor-item" v-for="(item, index) in anchorList" :key="index" @click="toRoomTop(item)">
        <img :src="item.avatar" />
        <div class="anchor-item-top">
          <i v-if="item.isOnlive" class="live"></i>
          <i class="hot">{{ item.hotNum }}</i>
        </div>
        <span class="anchor-item-title">{{ item.nickName }}</span>
      </div>
    </div>
    <div class="adv" v-if="adImg&&adImg != ''">
        <em class="ad-logo"></em>
        <em class="ad-close" @click="adImg = ''"></em>
        <img :src="adImg" @click="advFun(adMsg)"/>
    </div>
    <div class="live-cont">
      <div class="live-items" v-for="(item, index) in channelList" :key="index">
        <div class="right-border-title has-border">
          {{ item.channel.name }}
          <a>更多 ></a>
        </div>
        <LiveItem :list="item.list" />
      </div>
    </div>
  </div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style scoped>
.has-border{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #EEEEEE;
  margin: .2rem 0;
}
.has-border a{
  font-size: .16rem;
  color: #AEAEAE;
  font-weight: normal;
}
.home-player {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;
  height: 5.16rem;
}
.cover {
  position: relative;
  width: 9.25rem;
  height: 100%;
}
.line {
  width: 2.8rem;
  height: 5.16rem;
  margin-left: 0.1rem;
}
.line-item {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 1.22rem;
  margin-bottom: 0.1rem;
  border: 1px solid #eeeeee;
}
.line-item:hover {
  border: 0.02rem solid #FBC31F;
}
.line-item img {
  width: 100%;
  height: 100%;
}
.line-item:last-child {
  margin: 0;
}
.line-item-title {
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  padding: 0.09rem;
  font-size: 0.16rem;
  color: #fff;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(23, 23, 23, 0.73)
  );
}
.anchor {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.2rem;
}
.anchor-adv {
  margin-bottom: 0.1rem;
  width: 3.74rem;
  height: 1.82rem;
  border: 1px solid #eeeeee;
}
.anchor-adv img {
  width: 100%;
  height: 100%;
}
.anchor-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1.82rem;
  height: 1.82rem;
  margin-left: 0.1rem;
  margin-bottom: 0.1rem;
  border: 1px solid #eeeeee;
}
.anchor-item img {
  width: 100%;
  height: 100%;
}
.anchor-item-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.07rem;
}
.anchor-item-top .live {
  position: relative;
  display: inline-block;
  width: 0.52rem;
  height: 0.14rem;
  color: #fff;
  border-radius: 0.04rem;
  background: url("../../static/ic_live.png") no-repeat right;
  background-size: 0.36rem 0.14rem;
}
.anchor-item-top .live::before {
  background: #ff3226;
  box-shadow: 0 0 6px 0 rgba(192, 15, 188, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  content: " ";
  width: 0.17rem;
  height: 0.14rem;
  border-radius: 0.04rem 0 0 0.04rem;
  background-image: url("../../static/icon-living.png");
  animation: ani-living 0.6s steps(6) infinite;
  -webkit-animation: ani-living 0.6s steps(6) infinite;
  font-style: normal;
}
.anchor-item-top .hot {
  display: inline-block;
  height: 0.2rem;
  line-height: 0.2rem;
  padding-left: 0.18rem;
  background: url("../../static/ic_zb_hot.png") no-repeat left;
  background-size: 0.15rem 0.2rem;
  font-size: 0.18rem;
  color: #ffffff;
  font-weight: 500;
  text-align: center;
}
.anchor-item-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.07rem;
  font-size: 0.16rem;
  color: #fff;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(23, 23, 23, 0.73)
  );
}
.adv {
  width: 100%;
  height: 1rem;
  margin-top: 0.2rem;
  position: relative;
}
.adv img {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  width: 2.8rem;
  height: 1.56rem;
  border: 1px solid #eeeeee;
  padding: 0.1rem;
}
.swiper-slide.more {
  cursor: pointer;
  width: 1.84rem;
  background: #fafafa;
  text-align: center;
}
.swiper-slide.more i {
  display: inline-block;
  height: 1rem;
  padding-top: 0.8rem;
  background: url("../../static/ic_more.png") no-repeat left;
  background-size: 0.5rem 0.47rem;
}
.slide-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.16rem;
  color: #171717;
  border-bottom: 0.01rem solid #eeeeee;
  padding: 0 0.04rem 0.13rem 0.04rem;
}
.slide-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.16rem;
  padding-left: 0.14rem;
  padding-right: 0.14rem;
}
.slide-content .content-left {
  font-size: 0.2rem;
  color: #171717;
  font-weight: 500;
}
.slide-content .content-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.18rem;
  color: #171717;
  margin-bottom: 0.08rem;
}
.slide-content .content-item:last-child {
  margin-bottom: 0;
}
.slide-content .content-item .icon {
  display: inline-block;
  width: 0.36rem;
  height: 0.36rem;
  margin-right: 0.12rem;
}
.swiper-slide .slide-content .content-item span {
  max-width: 1.08rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.swiper-slide .race-name {
  width: 1.6rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.swiper-slide .slide-title .on {
  color: #FF3327;
}
.swiper-button-prev,
.swiper-button-next {
  color: #ADADAD;
}
.swiper-button-prev::after, 
.swiper-button-next::after {
    display: none;
}
.swiper-button-prev {
  width: 0.13rem;
  height: 0.24rem;
  background: url("../../static/ic_left.png") no-repeat;
  background-size: 100% 100%;
  transform: translate(50%, 50%);
}
.swiper-button-next {
  width: 0.13rem;
  height: 0.24rem;
  background: url("../../static/ic_right.png") no-repeat;
  background-size: 100% 100%;
  transform: translate(50%, 50%);
}
.slide-content .content-item .icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.tab a {
  display: inline-block;
  width: 0.6rem;
  height: 0.28rem;
  text-align: center;
  padding-bottom: 0.16rem;
  font-size: 0.16rem;
  color: #424242;
  margin-right: 0.1rem;
}
.tab a.on {
  background: #fbc31f;
  color: #fff;
}
.game {
  display: flex;
  margin-bottom: 0.18rem;
  border-bottom: 1px solid #EEEEEE;
}
.game .tab {
  margin-left: 0.33rem;
}
.cover:hover .cover-icon {
  display: block;
}
.cover-icon {
  cursor: pointer;
  display: none;
  background: #FF3226;
  width: 1.1rem;
  height: 1.1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px 0 rgba(192, 15, 188, 0.5);
  color: #fff;
  font-size: 0.18rem;
  opacity: 0.8;
}
.cover-icon span {
  position: absolute;
  left: 0.08rem;
  bottom: 0.3rem;
}
.cover-icon::after {
  position: absolute;
  top: 40%;
  left: 50%;
  z-index: 1;
  content: " ";
  width: 0.2rem;
  height: 0.2rem;
  background-image: url("../../static/icon-living.png");
  animation: ani-living 0.6s steps(6) infinite;
  -webkit-animation: ani-living 0.6s steps(6) infinite;
  font-style: normal;
  transform: translate(-50%, -50%);
}

@keyframes ani-living {
  0% {
    background-position: 0 0;
  }

  to {
    background-position: -108px 0;
  }
}
.swiper-container-warp {
  position: relative;
  padding: 0 0.3rem;
  width: 100%;
  height: 1.56rem;
}
.swiper-button-prev {
  left: 0;
}
</style>
