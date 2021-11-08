<template>
  <div>
    <div class="live-ad" v-if="adImg">
      <em class="ad-logo"></em>
      <em class="ad-close" @click="adImg = ''"></em>
      <img :src="adImg" @click="advFun(adMsg)"/>
    </div>
    <div class="right-border-title">
      主播预约赛程
    </div>
    <div class="book-list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="name">
          <span>{{ item.competitionName }}</span>
          <span>{{ item.matchTime | formatTime }}</span>
        </div>
        <div class="logos">
          <span>
            <img :src="item.homeLogo" alt="" />
            <em>{{ item.homeName }}</em>
          </span>
          <span>
            VS
          </span>
          <span>
            <img :src="item.awayLogo" alt="" /> <em>{{ item.awayName }}</em>
          </span>
        </div>
      </div>
      <div v-if="list.length === 0" class="no-reult">
        <img src="../../static/m/ic_sc_sebg.png" alt="" />
        暂无比赛
      </div>
    </div>
  </div>
</template>
<script>
import book from './book.js'
export default book
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
  height: 1.5rem;
  position: relative;
  margin-bottom: .2rem;
}
.live-ad img {
  width: 100%;
  height: 100%;
}
/* .book-list {
  height: 7.6rem;
  overflow-y: scroll;
  overflow-x: hidden;
} */
/*chrome--------------------------------------------start*/
.book-list::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}
/* Track */
.book-list::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 8px;
}
/* Handle */
.book-list::-webkit-scrollbar-thumb {
  background: #fbc31f;
  border-radius: 8px;
}
/* Handle on hover */
.book-list::-webkit-scrollbar-thumb:hover {
  background: #fbc31f;
}
.book-list::-webkit-scrollbar,
.book-list::-webkit-scrollbar {
  display: none;
}
.book-list::-webkit-scrollbar,
.book-list:hover::-webkit-scrollbar {
  display: block;
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
.item {
	display: flex;
	justify-content: flex-start;
	align-items: center;
  padding: 0.3rem;
  width: 100%;
  height: 1.5rem;
  border: 0.01rem solid #f5f5f5;
  box-shadow: 0.04rem 0.04rem 5px #f0f0f0;
  margin-top: 0.1rem;
}
.name {
	width: 30%;
  display: flex;
	justify-content: flex-start;
	flex-direction: column;
  font-size: 0.2rem;
  color: #171717;
}
.logos {
	width: 70%;
	display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.2rem;
}
.logos img {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
}
.logos span {
	display: inline-flex;
	justify-content: center;
  align-items: center;
	text-align: center;
	font-size: 0.36rem;
	color: #171717;
	font-weight: 500;
}
.logos span:first-child {
	flex-direction: row-reverse;
}
.logos span:nth-child(2) {
	margin: 0 0.32rem;
}
.logos em {
	width: 1.3rem;
	overflow: hidden;
	white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
	display: block;
	font-size: 0.24rem;
}
.right-border-title {
	font-size: 0.28rem;
}
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
</style>
