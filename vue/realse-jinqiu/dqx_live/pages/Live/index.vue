<template>
  <div>
    <div class="for-wrap">
      <div class="channel">
        <a
          v-for="(item, index) in channel"
          :key="index"
          :class="{ on: itemIndex == index }"
          @click="ChooseChannel(item.id, index)"
        >
          <img :src="item.logo" alt="" />
          <em>{{ item.name }}</em>
        </a>
      </div>
    </div>
    <div class="live-ad" v-if="adImg">
      <em class="ad-logo"></em>
      <em class="ad-close" @click="adImg = ''"></em>
      <img :src="adImg"  @click="advFun(adMsg)"/>
    </div>
    <LiveItem :list="liveList" />
  </div>
</template>
<script>
import index from './index.js'
export default {
  ...index
}
</script>
<style scoped>
.ad-close{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url('../../static/close.png')no-repeat center;
  background-size: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
}
.ad-logo{
  display: inline-block;
  width: 24px;
  height: 12px;
  background: url('../../static/ad.png')no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 9;
}
.live-ad {
  width: 100%;
  height: 1rem;
  margin-top: 0.2rem;
  position: relative;
  z-index: -1;
}
.live-ad img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1545px) and (min-width: 1194px) {
  .for-wrap {
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    position: fixed;
    left: 0;
  }
}
@media screen and (max-width: 1194px) {
  .for-wrap {
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    position: fixed;
    left: 0;
  }
}

@media screen and (min-width: 1545px) {
  .for-wrap {
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    position: fixed;
    margin-left: -1.7rem;
  }
}
.channel {
  width: 1.7rem;
  background: #ffffff;
  border: 1px solid rgba(238, 238, 238, 1);
  margin-top: 0.2rem;
}
.channel img {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 50%;
  margin-right: 0.15rem;
  margin-left: 0.1rem;
}
a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 0.6rem;
  color: #666666;
}
a.on {
  background: #fbc420;
  font-weight: bold;
  color: #181818;
}
a + a {
  border-top: 1px solid #eeeeee;
}
em {
  display: inline-block;
  font-size: 0.16rem;
  width: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>
