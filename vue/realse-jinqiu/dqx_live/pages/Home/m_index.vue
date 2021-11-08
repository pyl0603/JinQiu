<template>
  <div>
    <div class="swiper-containers" ref="swiper" v-swiper:mySwiper1="swiperOptionss">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in bannerListAll"
        :key="index"  @click="toRoom(item,'m')">
        <img :src="item.image" alt />
        </div>
      </div>
      
    <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <!-- <a-carousel autoplay>
      <a
        class="banner-top"
        v-for="(item, index) in bannerListAll"
        :key="index"
        :href="`/Room/m_index?id=${item.target}`"
      >
        <img :src="item.image" alt />
      </a>
    </a-carousel> -->
    <div class="game">
      <div class="tab">
        <a
          v-for="(item, index) in items"
          :key="index"
          @click="changeTab(item.value, index)"
          :class="{ on: itemIndex == index }"
        >{{ item.name }}</a>
      </div>
    </div>
    <div class="swiper-container-warp">
      <div
        v-if="scheduleList.length"
        v-swiper:mySwiper2="swiperOptionM"
        class="swiper-container"
        ref="mySwiper"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in scheduleList"
            :key="index"
            @click="toSchedule(item, 'm')"
          >
            <div class="slide-title">
              <span class="race-name" :title="item.competition">
                {{
                item.competition
                }}
              </span>
              <span :class="{ on: item.onLiving }" v-if="item.onLiving">直播中</span>
              <span v-if="!item.onLiving">
                {{
                item.matchTime | formatTime
                }}
              </span>
            </div>
            <div class="slide-content">
              <div class="content-left">{{ item.matchTime | timeToDate }}</div>
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
          <div class="swiper-slide more" @click="moreSchedule('m')" v-if="scheduleList.length > 9">
            <i>更多赛程</i>
          </div>
        </div>
      </div>
      <div v-if="scheduleList.length > 0" class="swiper-button-prev" @click="prev"></div>
      <div v-if="scheduleList.length > 0" class="swiper-button-next" @click="next"></div>
    </div>
    <div class="list-title">推荐主播</div>
    <div class="anchor">
      <div
        class="anchor-item"
        v-for="(item, index) in anchorList"
        :key="index"
        @click="toRoomTop(item, 'm')"
      >
        <img :src="item.avatar" />
        <div class="anchor-item-top">
          <i v-if="item.isOnlive" class="live"></i>
          <i class="hot">{{ item.hotNum }}</i>
        </div>
        <span class="anchor-item-title">{{ item.nickName }}</span>
      </div>
    </div>
    <div class="live-cont">
      <div class="live-items" v-for="(item, index) in channelList" :key="index">
        <div class="list-title has-border" @click="goMoreFun(item)">
          {{ item.channel.name }}
          <a>更多 ></a>
        </div>
        <MLiveItem :list="item.list" />
      </div>
    </div>
  </div>
</template>
<script>
import index from "./index.js";
import MLiveItem from "@/components/m_LiveItem.vue";
export default {
  ...index,
  layout: "m_default",
  components: {
    MLiveItem,
  },
};
</script>
<style scoped>
.banner-top {
  width: 7.1rem;
  height: 3.4rem;
  border-radius: 0.08rem;
  margin-left: 0.2rem;
}
.banner-top a {
  display: block;
  position: relative;
  z-index: 9;
  width: 100%;
  height: 100%;
}
.banner-top img {
  width: 7.1rem;
  height: 3.4rem;
  border-radius: 0.08rem;
  position: relative;
}
.list-title {
  display: block;
  color: #171717;
  font-size: 0.28rem;
  font-weight: bold;
  padding: 0.3rem 0.3rem 0 0.3rem;
}
.has-border {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
}
.has-border a {
  font-size: 0.16rem;
  color: #424242;
  font-weight: normal;
}
.tab a {
  display: inline-block;
  width: 0.65rem;
  height: 0.35rem;
  text-align: center;
  padding-bottom: 0.06rem;
  color: #424242;
  font-size: 0.26rem;
  margin-right: 0.6rem;
}
.tab a.on {
  border-bottom: 0.06rem solid #fbc31f;
  font-size: 0.3rem;
  color: #171717;
  font-weight: bold;
}
.game {
  display: flex;
  height: 0.9rem;
  align-items: center;
}
.game .tab {
  margin-left: 0.3rem;
}
.swiper-slide {
  width: 3rem;
  height: 1.6rem;
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
  padding: 0 0.04rem 0.1rem 0.04rem;
}
.slide-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  padding-bottom: 0.15rem;
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
  width: 0.42rem;
  height: 0.42rem;
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
  width: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.swiper-slide .slide-title .on {
  color: #ff3327;
}
.swiper-button-prev,
.swiper-button-next {
  display: none;
  color: #adadad;
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
.swiper-container-warp {
  position: relative;
  padding: 0 0.3rem;
  width: 100%;
  height: 1.56rem;
}
.swiper-button-prev {
  left: 0;
}
.anchor {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.15rem;
  margin-left: 0.1rem;
  width: calc(100% - 0.1rem);
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
  width: 2.16rem;
  height: 2.16rem;
  border-radius: 0.08rem;
  overflow: hidden;
  margin-left: 0.2rem;
  margin-bottom: 0.15rem;
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
  height: 0.18rem;
  color: #fff;
  border-radius: 0.04rem;
  background: #ff3226 url("../../static/ic_live.png") no-repeat right;
  background-size: 0.36rem 0.18rem;
}
.anchor-item-top .live::before {
  box-shadow: 0 0 6px 0 rgba(192, 15, 188, 0.5);
  position: absolute;
  top: -1;
  left: 0;
  z-index: 1;
  content: " ";
  width: 0.17rem;
  height: 0.18rem;
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

@keyframes ani-living {
  0% {
    background-position: 0 0;
  }

  to {
    background-position: -108px 0;
  }
}
.swiper-containers {
  position: relative;
  width: 7.1rem;
  height: 3.4rem;
  overflow: hidden;
  margin-left: .2rem;
}
.swiper-containers .swiper-slide{
  width: 7.1rem;
  height: 3.4rem;
  border: none;
}
.swiper-containers .swiper-slide img{
  width: 100%;
  height: 100%;
}
.swiper-containers >>> .swiper-pagination-bullet{
  background: #adadad;
}
.swiper-containers >>> .swiper-pagination-bullet-active{
  background: #ffffff!important;
}
</style>
