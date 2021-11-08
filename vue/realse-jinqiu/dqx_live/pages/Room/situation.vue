<template>
  <div class="situation">
    <div class="team-name">
      <span>
        <img
          :src="matchVo.home.logo"
          alt=""
        />{{matchVo.home.name}}</span
      >
      <span>
        {{matchVo.away.name}}
        <img
          :src="matchVo.away.logo"
          alt=""
      /></span>
    </div>
    <div class="bball-list">
        <!-- 左右 -->
        <div class="bball-cont" v-for="(item, index) in list" :key="index">
          <div class="count-info">
            <em
              >{{ item.home
              }}<em v-if="item.type_name.indexOf('率') > -1">%</em></em
            >
            <em>{{ item.type_name }}</em>
            <em
              >{{ item.away
              }}<em v-if="item.type_name.indexOf('率') > -1">%</em></em
            >
          </div>
          <div class="bball-item">
            <div class="left">
              <span
                class="left-item"
                :style="{
                  width:
                    (100 * 1 * item.home) / (item.away * 1 + item.home * 1) +
                    '%'
                }"
                :class="{ on: item.home < item.away }"
              ></span>
            </div>
            <div class="right">
              <span
                class="right-item"
                :style="{
                  width:
                    (100 * 1 * item.away) / (item.away * 1 + item.home * 1) +
                    '%'
                }"
                :class="{ on: item.home > item.away }"
              ></span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getBkAna, getFbAna} from "@/api/match";
export default {
   props:{
    matchVo:{
      type:Object,
      default: () => {}
    },
    category:{
      type: Number
    }
  },
  data() {
    return {
      list: [
      ]
    };
  },
  created(){
    let id = this.matchVo.id;
    if (this.category == 0) {
      getFbAna(id).then(res => {
        console.log(res)
        this.list = res.data.stats;
      });
    } else {
      getBkAna(id).then(res => {
        this.list = res.data.stats;
      });
    }
  }
};
</script>
<style scoped>
.situation {
  width: 6.9rem;
  margin: 0 auto;
  margin-top: 0.3rem;
}
.team-name {
  display: flex;
  justify-content: space-between;
  height: 0.36rem;
  align-items: center;
}
.team-name span {
  display: inline-block;
  line-height: 0.36rem;
}
.team-name img {
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
}
.team-name span:first-child img {
  margin-right: 0.1rem;
}
.team-name span:last-child img {
  margin-left: 0.1rem;
}
.bball-list {
  padding: 0 4%;
}

.bball-det .title,
.match-tops .title {
  padding: 0 4%;
  display: block;
  font-size: 0.18rem;
  height: 0.8rem;
  font-weight: bolder;
  line-height: 0.8rem;
}

.bball-item {
  display: flex;
  width: 100%;
  height: 0.1rem;
  border-radius: 0.08rem;
  margin-top: 0.1rem;
  background: #F5F5F5;
}

.bball-item .left {
  height: 0.1rem;
  width: 50%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
}

.bball-item .right {
  height: 0.1rem;
  width: 50%;
  display: flex;
}

.left-item {
  height: 0.1rem;
  background-color: #FFC100;
  border-radius: 08rem 0 0 08rem;
  /* opacity: .3; */
}

/* .bball-item .on{
    opacity: .3;
} */

.right-item {
  height: 0.1rem;
  background-color: #0070FF;
  border-radius: 0 08rem 08rem 0;
}

/* .fball .left-item{
    background-color: #18CE94;
} */

.count-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.18rem;
  margin-top: 0.3rem;
}
</style>
