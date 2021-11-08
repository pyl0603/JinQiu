<template>
  <div class="live-list">
    <div class="item" @click="toRoom(item,'m')" v-for="item in list" :key="item.id" >
      <img :src="item.logo" alt="" class="item-img" />
      <div class="live-info">
        <span>
          <!-- <img :src="item.streamer.avatar" alt="" /> -->
          {{item.streamer ? item.streamer.nickName : item.nickName}}
        </span>
        <i>{{item.hotNum}}</i>
      </div>
      <em>{{item.permnition || item.topic}}</em>
    </div>
    <div v-if="list.length === 0" class="no-reult">
      <img src="../static/ic_zb_error.png" alt="" />
      暂无数据
    </div>
  </div>
</template>
<script>
import index from './liveitem.js'
export default {
  ...index
}
</script>
<style scoped>
.live-list .no-reult{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  padding-top: 1rem;
  color: #AEAEAE;
  font-size: 0.24rem;
}
.no-reult img {
  margin-bottom: 0.24rem;
}
.live-list {
  padding: 0 4%;
}
.live-list .item {
  width: 100%;
  margin-top: .2rem;
}
.live-list .item em {
  display: block;
  font-size: 0.28rem;
  font-family: PingFang SC;
  color: rgba(23, 23, 23, 1);
  margin-top: -.2rem;
}
.live-list .item .item-img {
  width: 100%;
  height: 3.4rem;
  border-radius: .08rem;
}
.live-info {
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.28rem;
  color: #ffffff;
  position: relative;
  top: -.6rem;
}
.live-info span {
  display: flex;
  align-items: center;
}
.live-info i {
  display: inline-block;
  height: 0.25rem;
  line-height: .25rem;
  padding-left: 0.25rem;
  background: url("../static/m/ic_home_hot.png") no-repeat left;
  background-size: 0.18rem 0.24rem;
  font-size: 0.2rem;
  color: #ffffff;
}
</style>
