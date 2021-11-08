<template>
  <div class="live-list">
    <div class="item" @click="toRoom(item)" v-for="item in list" :key="item.id" >
      <img :src="item.logo" alt="" class="item-img" />
      <em>{{item.permnition || item.topic}}</em>
      <div class="live-info">
        <span>
          <img :src="item.streamer.avatar" alt="" />
          {{item.streamer.nickName}}
        </span>
        <i>{{item.addNum}}</i>
      </div>
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
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 11.6rem;
  margin-left: 0.2rem;
}
.live-list .item {
  width: 3.74rem;
  height: 3.3rem;
  border: 1px solid rgba(237, 237, 237, 1);
  margin-right: 0.1rem;
  margin-top: 0.1rem;
}
.live-list .item em {
  display: block;
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 23, 1);
  padding: 0.1rem;
}
.live-list .item .item-img {
  width: 100%;
  height: 2.1rem;
}
.live-info {
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.16rem;
  color: #414141;
}
.live-info span {
  display: flex;
  align-items: center;
}
.live-info img {
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.live-info i {
  display: inline-block;
  height: 0.2rem;
  padding-left: 0.2rem;
  background: url("../static/ic_hot.png") no-repeat left;
  background-size: 0.15rem 0.2rem;
  font-size: 0.18rem;
  color: #adadad;
}
</style>
