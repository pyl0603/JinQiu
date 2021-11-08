<template>
<div class="schedule">
   <div class="for-wrap">
      <div class="channel">
        <a :class="{ on: category == 0 }" @click="changeTab(0)">
          <img src="../../static/ic_fb.png" alt="" />
          <em>足球</em>
        </a>
        <a :class="{ on: category == 1 }" @click="changeTab(1)">
          <img src="../../static/ic_bk.png" alt="" />
          <em>篮球</em>
        </a>
        <!-- <a
          v-for="(item, index) in channel"
          :key="index"
          :class="{ on: itemIndex == index }"
          @click="ChooseChannel(item.id, index)"
        >
          <img :src="item.logo" alt="" />
          <em>{{ item.name }}</em>
        </a> -->
      </div>
    </div>
    <div class="date-list">
      <div class="date-item" :class="{on: currntIndex === index}" v-for="(item, index) in dateList" :key="index" @click="changeDateTab(item, index)">
        <span>{{item.week}}</span>
        <span>{{item.date}}</span>
      </div>
    </div>
    <div class="current-warp">
      <div class="current-date">{{currentDate}}</div>
      <a-table :data-source="data" :pagination="pagination" @handleTableChange="handleTableChange" rowKey="(record, index) => index}">
        <!-- <a-table-column-group>
          <a-table-column key="firstName" data-index="firstName">
            <span slot="title" style="color: #1890ff">First Name</span>
          </a-table-column>
          <a-table-column key="lastName" title="Last Name" data-index="lastName" />
        </a-table-column-group> -->
        <a-table-column key="competitionName" title="联赛名称" data-index="competitionName" align="center"  width="200" />
        <a-table-column key="matchTime" title="比赛时间" data-index="matchTime" align="center" width="150">
           <template slot-scope="matchTime">
             {{matchTime | formatTime}}
          </template>
        </a-table-column>
        <a-table-column key="team" title="球队" align="center">
          <template slot-scope="team">
            <span class="team">
              {{team.homeName}}
              <img :src="team.homeLogo" alt="">
            </span>
            <i>VS</i>
            <span class="team">
              <img :src="team.awayLogo" alt="">
              {{team.awayName}}
            </span>
          </template>
        </a-table-column>
        <a-table-column key="streamers" title="主播" data-index="streamers" align="center">
          <template slot-scope="streamers">
            <div class="anchor-warp">
              <div class="anchor-content" v-if="anchorCurrent === 1">
                <a v-for="(item, index) in streamers.slice(0, 5)" :title="item.nickName" :key="index" class="anchor" color="blue" @click="toRoom(item)">
                  <img :src="item.avatar" alt="">
                  <span class="nickname">{{item.nickName}}</span>
                  <i class="live" v-if="item.isMatchOnlive"></i>
                </a>
              </div>
               <div class="anchor-content" v-if="anchorCurrent === 2">
                <a v-for="(item, index) in streamers.slice(5, streamers.length)" :title="item.nickName" :key="index" class="anchor" color="blue" @click="toRoom(item)">
                  <img :src="item.avatar" alt="">
                  <span class="nickname">{{item.nickName}}</span>
                  <i class="live" v-if="item.isMatchOnlive"></i>
                </a>
              </div>
              <div v-if="streamers.length > 5 && anchorCurrent === 2" class="button-prev" @click="prev()"></div>
              <div v-if="streamers.length > 5 && anchorCurrent === 1" class="button-next" @click="next()"></div>
            </div>
          </template>
        </a-table-column>
        <!-- <a-table-column key="action" title="Action">
          <template slot-scope="text, record">
            <span>
              <a>Action 一 {{ record.firstName }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
            </span>
          </template>
        </a-table-column> -->
      </a-table>
    </div>
  </div>
</template>
<script>
import index from './index.js'
export default {
  ...index,
  mounted() {
    this.getDateList()
    this.getList()
  }
}
</script>
<style scoped>
  .ant-table-pagination.ant-pagination{
    text-align: center;
    float: none;
  }
  .anchor img{
    width: 0.4rem;
    height: 0.4rem;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
  }
  .ant-table{
    line-height: 1;
  }
  .anchor {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.14rem;
    color: #171717;
  }
  .ant-table-thead > tr > th .ant-table-header-column{
    font-weight: 600;
  }
  /* .anchor:after{
    background: #fc1a1a;
    box-shadow: 0 0 6px 0 rgba(192, 15, 188, 0.5);
    position: absolute;
    top: 40px;
    left: 62%;
    z-index: 1;
    content: " ";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-image: url('../../static/icon-living.png');
    animation: ani-living 0.6s steps(6) infinite;
    -webkit-animation: ani-living 0.6s steps(6) infinite;
    font-style: normal;
  }
  
@keyframes ani-living {
  0% {
    background-position: 0 0
  }

  to {
    background-position: -108px 0
  }
} */
@media screen and (max-width: 1545px) and (min-width: 1194px) {
  .for-wrap{
    width: 1194px;
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    position: fixed;
    left: 0;
       z-index:  9;
  }
}
@media screen and (max-width: 1194px) {
  .for-wrap{
    /* width: 1154px; */
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    position: fixed;
    left: 0;
     z-index:  9;
  }
}

@media screen and (min-width: 1545px) {
  .for-wrap{
    /* width: 100%; */
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    position: fixed;
    margin-left: -1.8rem;
    z-index:  9;
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
/* a + a {
  border-top: 1px solid #eeeeee;
} */
em {
  display: inline-block;
  font-size: 0.16rem;
  width: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.current-warp {
  border: 1px solid #F5F5F5;
}
.current-date {
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  color: #171717;
}
.date-list {
  height: 0.8rem;
  margin: 0.1rem 0;
  border: 1px solid #F5F5F5;
}
.date-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% / 7);
  height: 100%;
  font-size: 0.16rem;
  color: #171717;
}
.date-item.on {
  color: #FBC31F;
}
.team {
  text-align: center;
  font-size: 0.2rem;
  color: #424242;
}
.team img {
  width: 0.36rem;
  height: 0.36rem;
  margin: 0 0.1rem;
  border-radius: 50%;
}
.team {
  font-weight: 500;
  margin: 0 0.1rem;
}
.anchor-warp {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.anchor-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.anchor-warp .nickname {
  width: 0.56rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.button-prev {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0.2rem;
  height: 0.2rem;
  background: url("../../static/left.png") no-repeat;
  background-size: 100% 100%;
  transform: translate(-50%, -50%);
}
.button-next {
  position: absolute;
  top: 50%;
  right: 0;
  width: 0.2rem;
  height: 0.2rem;
  background: url("../../static/rigtt.png") no-repeat;
  background-size: 100% 100%;
  transform: translate(-50%, -50%);
}
.anchor .live {
  position: absolute;
  left: auto;
  bottom: 0.2rem;
  display: inline-block;
  width: 0.36rem;
  height: 0.14rem;
  color: #fff;
  background: url("../../static/ic_live.png") no-repeat right;
  background-size: 0.36rem 0.14rem;
}
</style>