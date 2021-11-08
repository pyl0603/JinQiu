<template>
  <div class="text-live scroll">
    <div class="sort-item">
      <!-- <a v-for="item in items" :key="item.value"></a> -->
    </div>
    <div class="items" v-for="(item, index) in list" :key="index">
      <img
        :src="
          item.position.value === 0
            ? 'https://duoquxiang.oss-cn-shenzhen.aliyuncs.com//drawable-xhdpi/ic_match_zb_jinqiu.png'
            : item.position.value == 1
            ? matchVo.home.logo
            : matchVo.away.logo
        "
        alt=""
      />
      <span>{{
        item.position.value === 0
          ? "官方"
          : item.position.value == 1
          ? matchVo.home.name
          : matchVo.away.name
      }}</span>
      <em>{{ item.time }}</em>
      <em> {{ item.message }}</em>
    </div>
  </div>
</template>
<script>
import { getBkTlive } from "@/api/match";
import openSocket from "socket.io-client";
export default {
  props: {
    matchVo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: []
      // items:[{name:'第一节',value:1},{name:'第二节',value:2},{name:'第三节',value:3},{name:'第四节',value:4}]
    };
  },
  filters: {},
  mounted() {
    let id = this.matchVo.id;
    let socket = openSocket(`http://socket.jinqiulive.com:9999?client=admin`);
    if (this.matchVo.id) {
      getBkTlive(this.matchVo.id).then(res => {
        this.list = res.data;
      });
    }
    socket.on("connect", () => {
      console.log("connect");
      let chMsg = { channel: `bb.match.live.${id}` };
      // 加入直播间
      socket.emit("dqx.channel.join", chMsg, data => {
        console.log(data, "加入直播间");
      });
      // 接收消息
      socket.on(`basketball.match.tlives`, res => {
        console.log("接收消息", res);
        this.list.unshift(res);
      });
    });
  },
  watch: {
    matchVo(newVal) {
      getBkTlive(nweVal.id).then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>
<style scoped>
.text-live {
  margin-top: 0.3rem;
  /* height: 7.6rem;
  overflow-y: scroll;
  overflow-x: hidden; */
}
.text-live::-webkit-scrollbar {
  display: none;
}
.items {
  width: 96%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 0.5rem;
  border-bottom: 1px solid #eeeeee;
  font-size: 0.16rem;
  color: #171717;
}
.items img {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.items span {
  display: inline-block;
  width: 0.96rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.items em {
  margin-right: 0.1rem;
}
</style>
