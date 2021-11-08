<template>
  <div class="event scroll">
    <img src="../../static/ic_event_over.png" alt="" class="event-over" />
    <div class="event-cont">
      <div class="items" v-for="(item, index) in list" :key="index">
        <!-- 黄牌 3-->
        <!-- 两黄变红 15-->
        <!-- 红牌 4-->
        <!-- 进球 1-->
        <!-- 换人 9-->
        <!-- 点球 8-->
        <!-- 乌龙球 17-->
        <!-- VAR 28-->
        <!-- 中场 11-->
        <!-- 伤停补时 19-->
        <!-- 结束 -->
        <div class="left">
          <div class="left-cont" v-if="item.position === 1">
            <!-- <span v-if="item.type === 3">
              <em>{item.}</em>
              <img src="../../static/ic_match_zb_yellow.png" alt="">
            </span> -->
            <span>
              <em v-if="item.type === 9">{{item.in_player_name}}</em>
              <em v-if="item.type === 28">{{item.var_result}}</em>
              <em v-if="item.type != 9 || item.type != 28">{{item.player_name}}</em>
              <img :src="item.type | eventIcon" alt=""
            /></span>
            <span v-if="item.type == 9">
              <em>{{item.out_player_name}}</em>
              <img src="../../static/ic_event_down.png" alt="" />
              </span
            >
          </div>
        </div>
        <div class="time">
          <em v-if="item.type === 19">伤停补时</em>
          <em v-else-if="item.type === 11">中场休息</em>
          <em v-else>{{item.time}}'</em>
          
          </div>
        <div class="right">
          <div class="right-cont"  v-if="item.position === 2">
             <span>
              <img :src="item.type | eventIcon" alt=""
            />
              <em v-if="item.type === 9">{{item.in_player_name}}</em>
               <em v-if="item.type === 28">{{item.var_result}}</em>
              <em v-if="item.type != 9 || item.type != 28">{{item.player_name}}</em>
            </span>
            <span v-if="item.type == 9">
              <img src="../../static/ic_event_down.png" alt="" />
              <em>{{item.out_player_name}}</em></span
            >
          </div>
        </div>
      </div>
    </div>
    <img src="../../static/ic_event_start.png" alt="" class="event-start" />
  </div>
</template>
<script>
import { getIncidents } from "@/api/match";
import openSocket from "socket.io-client";
export default {
  props: {
    matchVo: {
      type: Object,
      default: () => {}
    },
    category: {
      type: Number
    }
  },
  data() {
    return {
      list: []
    };
  },
  filters:{
     eventIcon(type) {
      let typeList = {
        3: require('@/static/ic_match_zb_yellow.png'),
        15: require('@/static/ic_event_twoy.png'),
        4: require('@/static/ic_ss_red.png'),
        1: require('@/static/ic_ss_goal.png'),
        8: require('@/static/ic_ss_dq.png'),
        17: require('@/static/ic_ss_wl.png'),
        28: require('@/static/ic_ss_var.png'),
        9: require('@/static/ic_event_up.png')
      };
      return typeList[type];
    },
  },
  mounted() {
    let id = 3402155;
    let socket = openSocket(`http://socket.jinqiulive.com:9999?client=admin`);
    getIncidents(this.matchVo.id).then(res => {
      this.list = res.data;
      this.list.map(res => {
        console.log(res);
      });
    });
    socket.on("connect", () => {
        console.log("connect");
        let chMsg = { channel: `fb.match.live.${id}` };
        // 加入直播间
        socket.emit("dqx.channel.join", chMsg, data => {
          console.log(data, "加入直播间111");
        });
        // 接收消息
        socket.on(`football.match.incident`, res => {
          console.log("接收消息", res);
          this.list.unshift(res)
        });
    });
  },
  
};
</script>
<style scoped>
.event-over {
  width: 0.26rem;
}
.event-start {
  width: 0.24rem;
}
.event {
  text-align: center;
  margin-top: 0.5rem;
}
.event-cont {
  padding: 0.3rem;
  background: url("../../static/ic_line.png") repeat-y center;
  background-size: 0.02rem;
  zoom: 1;
  margin-top: 0.1rem;
  font-size: 0.16rem;
}
.event-cont img {
  height: 0.22rem;
  margin: 0 0.1rem;
}
.items {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  align-items: flex-start;
}
.left,.right{
  width: 3.75rem;
}
.left-cont {
  display: flex;
  width: 3.75rem;
  min-height: 0.22rem;
  padding: 0.08rem 0;
  background: rgba(245, 245, 245, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  border-radius: 0.08rem 0px 0.08rem 0.08rem;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.right-cont {
  display: flex;
  align-items: center;
  width: 3.75rem;
  min-height: 0.22rem;
  padding: 0.08rem 0;
  background: rgba(245, 245, 245, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  border-radius: 0px 0.08rem 0.08rem 0.08rem;
  flex-wrap: wrap;
}

.event-cont span {
  display: block;
  width: 100%;
}
.event-cont span + span {
  margin-top: 0.1rem;
}
.left-cont span {
  text-align: right;
}
.right-cont span {
  text-align: left;
}
.time {
  min-width: 0.1rem;
  padding: 0 .1rem;
  height: 0.3rem;
  background: rgba(255, 193, 0, 1);
  border-radius: .15rem;
  line-height: 0.3rem;
  text-align: center;
  font-size: 0.12rem;
  color: #171717;
}
</style>
