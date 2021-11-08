<template>
  <div>
    <div class="game">
      <div class="tab">
        <a
          v-for="(item, index) in items"
          :key="index"
          @click="changeTabM(item.value, index)"
          :class="{ on: itemIndex == index }"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="date-list">
      <div class="date-item" :class="{on: currntIndex === index}" v-for="(item, index) in dateList" :key="index" @click="changeDateTab(item, index)">
        <span v-if="index === 0">今日</span>
        <span v-if="index !== 0">{{item.week}}</span>
        <span v-if="index !== 0">{{item.date}}</span>
      </div>
    </div>
    <div class="m-list" @touchstart="touchStart($event)" @touchend="touchEnd($event)">
      <div v-for="(item,index) in data" :key="index" class="m-item"  @click="moreFun(item.category,item.matchId,item)">
        <div class="m-info">
          <span>{{item.matchTime | formatTimeHHmm}}  {{item.competitionName}}</span>
          <span>{{item.streamers.length}}位主播 ></span>
        </div>
        <div class="m-det">
          <div class="team">
            <span>
              <img :src="item.homeLogo" alt="">
              {{item.homeName}}</span>
            <span>
              <img :src="item.awayLogo" alt="">
              {{item.awayName}}
              </span>
          </div>
          <div class="streamer">
            <img :src="url.avatar" alt="" v-for="(url,index) in item.streamers" :key="index">
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.length === 0" class="no-reult">
        <img src="../../static/m/ic_sc_sebg.png" alt="" />
        暂无比赛
      </div>
  </div>
</template>
<script>
import index from './index.js'
export default {
  ...index,
  layout:'m_default',
  mounted() {
    this.getDateList()
    this.getListM()
  }
}
</script>
<style scoped>
.no-reult {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  color: #AEAEAE;
  font-size: 0.24rem;
}
.no-reult img {
  margin-bottom: 0.24rem;
}
.m-list{
  padding: 0 .3rem;
  padding-bottom: 1.3rem;
}
.m-det{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-item+.m-item{
  border-top: 1px solid #EEEEEE;
}
.m-item{
  padding: .3rem 0;
}
.team span{
  display: flex;
  align-items: center;
  font-size: .24rem;
  color: #181818;
  margin-top: .1rem;
}
.team span img{
  margin-right: .2rem;
}
.streamer img{
  margin-right: .15rem;
}
.m-det img{
  width: .52rem;
  height: .52rem;
  border-radius: 50%;
}
.m-info{
  display: flex;
  justify-content: space-between;
  color: #666666;
  font-size: .24rem;
  margin-bottom: .2rem;
}
  .tab a {
  display: inline-block;
  width: 0.65rem;
  height: 0.35rem;
  text-align: center;
  padding-bottom: 0.06rem;
  color: #424242;
  font-size: .26rem;
  margin-right: 0.6rem;
}
.tab a.on {
  border-bottom: .06rem solid #FBC31F;
  font-size: 0.3rem;
  color: #171717;
  font-weight: bold;
}
.game {
  display: flex;
  height: .9rem;
  align-items: center;
}
.game .tab {
  margin-left: 0.3rem;
}
.date-list {
  display: flex;
  align-items: center;
  height: 0.88rem;
  background: #F5F5F5;
}
.date-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% / 7);
  height: 100%;
  font-size: 0.24rem;
  color: #424242;
}
.date-item.on {
  background: #FBC31F;
}
</style>