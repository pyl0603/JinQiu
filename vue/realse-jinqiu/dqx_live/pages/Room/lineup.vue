<template>
  <div class="line-up scroll">
    <!-- 主队 -->
    <div class="team-list">
      <div class="list-title">
        <img :src="matchDet.home.teamEntity.logo" />
          <em>{{ matchDet.home.teamEntity.name_zh }}</em>
      </div>
      <div class="item" v-for="item in homeList" :key="item.id">
        <em>{{item.shirt_number}}</em>
        <img :src="item.logo" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
    <!-- 阵容数据 -->
    <div
      class="live-lineup"
      :class="{ on: homeLists == 6 || awayLists == 6 }"
      v-if="homeLists.length > 0"
    >
      <!-- 第一队阵容 -->
      
        <div class="first-lineup-msg">
          <div class="lineup-name">
            <img :src="matchDet.home.teamEntity.logo" />
            <em>{{ matchDet.home.teamEntity.name_zh }}</em>
            <span>{{ dataDet.home_formation }}</span>
          </div>
          <em>主教练：{{ managerDet.homeManager.name_zh }}</em>
        </div>
      <div class="first-lineup">
        <div class="first-lineup-item first-lineup-first">
          <div class="lineup-member lineup-g">
            <img :src="homeGItem.logo" :onerror="defaultImg" />
            <span
              ><em>{{ homeGItem.shirt_number }}</em
              >.{{ homeGItem.name }}</span
            >
          </div>
        </div>
        <div class="first-lineup-list">
          <div
            class="first-lineup-item first-lineup-second"
            v-for="(item, index) in homeLists"
            :key="index"
          >
            <div
              class="lineup-member"
              v-for="(items, index) in item"
              :key="index"
            >
              <img :src="items.logo" :onerror="defaultImg" />
              <span
                ><em>{{ items.shirt_number }}</em
                >.{{ items.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 第二队阵容 -->
      <div class="second-lineup">
        <div class="second-lineup-list">
          <div
            class="second-lineup-item second-lineup-first"
            v-for="(item, index) in awayLists"
            :key="index"
          >
            <div
              class="lineup-member"
              v-for="(items, index) in item"
              :key="index"
            >
              <img :src="items.logo" :onerror="defaultImg" />
              <span
                ><em>{{ items.shirt_number }}</em
                >.{{ items.name }}</span
              >
            </div>
          </div>
        </div>
        <div class="second-lineup-item second-lineup-fourth">
          <div class="lineup-member lineup-g">
            <img :src="awayGItem.logo" :onerror="defaultImg" />
            <span>
              <em>{{ awayGItem.shirt_number }}</em
              >.{{ awayGItem.name }}</span
            >
          </div>
        </div>
      </div>
        <div class="second-lineup-msg">
          <div class="lineup-name">
            <img :src="matchDet.guest.teamEntity.logo" />
            <em>{{ matchDet.guest.teamEntity.name_zh }}</em>
            <span>{{ dataDet.away_formation }}</span>
          </div>
          <em>主教练：{{ managerDet.awayManager.name_zh }}</em>
        </div>
    </div>
    <!-- 客队 -->
    <div class="team-list team-away">
      <div class="list-title">
        <em>{{ matchDet.guest.teamEntity.name_zh }}</em>
        <img :src="matchDet.guest.teamEntity.logo" />
      </div>
      <div class="item" v-for="item in awayList" :key="item.id">
        <span>{{item.name}}</span>
        <img :src="item.logo" alt="">
        <em>{{item.shirt_number}}</em>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getLineup } from '@/api/match'
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
      defaultImg: 'this.src="../img/def_nav_portrait.png"',
      data: {
        matchevent: { name_zh: "" },
        guest: { teamEntity: {} },
        home: { teamEntity: {} },
        status: {}
      },
      // list: '',
      homeList: [],
      awayList: [],
      managerDet: {
        awayManager: {
          name_zh: ""
        },
        homeManager: {
          name_zh: ""
        }
      }, // 直播数据
      matchTime: "",
      injuryHome: [], // 队1伤停
      injuryAway: [], // 队2伤停
      substitutionHome: [], // 队1换人
      substitutionAway: [], // 队2换人
      spliceList: [], //拼接组队数据
      dataDet: "", //阵容数据
      liveSta: 0, // 直播状态
      homeGItem: "", //主队守门员
      awayGItem: "", //客队守门员
      homeLists: [],
      awayLists: [],
      homeAll:[],
      matchDet: {
        matchevent: {
          short_name_zh: ""
        },
        home: {
          teamEntity: {
            name_zh: "",
            logo: ""
          }
        },
        guest: {
          teamEntity: {
            name_zh: "",
            logo: ""
          }
        }
      }
    };
  },
  filters: {
    playerPos(pos) {
      let posList = {
        D: "后卫",
        M: "中场",
        F: "前锋",
        G: "守门员"
      };
      return posList[pos];
    }
  },
  created() {
    let id = 3402155;
    axios
      .get(
        `https://api.jinqiulive.com/client-app/nami-match/match/detail?id=${id}`
      )
      .then(res => {
        this.data = res.data.data;
        this.matchDet = res.data.data;
        console.log("data", "matchDet", this.data);
        switch (this.matchDet.customStatus) {
          case 0 || -1 || 9 || 12 || 13:
            this.liveSta = 1;
            break;
          case 1:
            this.liveSta = 4;
            break;
          case 2 || 3 || 4 || 5 || 6 || 7:
            this.liveSta = 2;
            break;
          case 8 || 10 || 11:
            this.liveSta = 3;
            break;
        }
        console.log("===>matchDet", this.matchDet);
        this.matchTime = this.timestampToTime(this.data.matchTime);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(
        `https://api.jinqiulive.com/client-app/nami-match/match/info?id=${id}`
      )
      .then(res => {
        // this.list = res.data.data.stats;
        this.managerDet = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
    this.getLineUp(id);
  },
  methods: {
    // 过滤重复本场换人
    unique(arr) {
      const res = new Map();
      return arr.filter(
        arr => !res.has(arr.inplayer.id) && res.set(arr.inplayer.id, 1)
      );
    },
    //获取比赛阵容
    getLineUp(id) {
     getLineup(id).then(res => {
          this.dataDet = res.data;
          console.log(this.dataDet);
          if (this.dataDet.home) {
            // 主队守门员
            this.dataDet.home.map(item => {
              if (item.firstStatus && item.position == "G")
                this.homeGItem = item;
            });
            // 客队守门员
            this.dataDet.away.map(item => {
              if (item.firstStatus && item.position == "G")
                this.awayGItem = item;
            });
            // 首发阵容数据拼接
            // 客队
            let tempH = {};
            this.dataDet.home.map(item => {
              if (item.firstStatus && item.position != "G") {
                this.homeAll.push(item)
                if (!tempH[item.y]) {
                  tempH[item.y] = [];
                  this.homeLists.push(tempH[item.y]);
                }
                tempH[item.y].push(item);
              }

              if (item.incidents && item.incidents.length > 0) {
                item.incidents.map(temp => {
                  let in_player = {};
                  let out_player = {};
                  if (temp.in_player) {
                    in_player = this.dataDet.playerMap[temp.in_player.id];
                  }
                  if (temp.out_player) {
                    out_player = this.dataDet.playerMap[temp.out_player.id];
                  }
                  if (in_player && out_player) {
                    if (
                      JSON.stringify(in_player) !== "{}" ||
                      JSON.stringify(out_player) !== "{}"
                    ) {
                      this.substitutionHome.push({
                        time: temp["time"],
                        inplayer: in_player,
                        outplayer: out_player
                      });
                    }
                    this.substitutionHome = this.unique(this.substitutionHome);
                  }
                });
              }
            });
            console.log(this.homeAll)
            // 主队
            let tempA = {};
            this.dataDet.away.map(item => {
              if (item.firstStatus && item.position != "G") {
                if (!tempA[item.y]) {
                  tempA[item.y] = [];
                  this.awayLists.push(tempA[item.y]);
                }
                tempA[item.y].push(item);
              }

              if (item.incidents && item.incidents.length > 0) {
                item.incidents.map(temp => {
                  let in_player = {};
                  let out_player = {};
                  if (temp.in_player) {
                    in_player = this.dataDet.playerMap[temp.in_player.id];
                  }
                  if (temp.out_player) {
                    out_player = this.dataDet.playerMap[temp.out_player.id];
                  }
                  if (in_player && out_player) {
                    if (
                      JSON.stringify(in_player) !== "{}" ||
                      JSON.stringify(out_player) !== "{}"
                    ) {
                      this.substitutionAway.push({
                        time: temp["time"],
                        inplayer: in_player,
                        outplayer: out_player
                      });
                    }
                  }
                  this.substitutionAway = this.unique(this.substitutionAway);
                  console.log("this.substitutionAway", this.substitutionAway);
                });
              }
            });
            // 替补数据拼接
            let homes = [];
            let aways = [];
            this.dataDet.home.map(res => {
              if (!res.firstStatus) {
                homes.push(res);
              }
            });
            this.dataDet.away.map(res => {
              if (!res.firstStatus) {
                aways.push(res);
              }
            });
            this.homeList = homes;
            this.awayList = aways;
            console.log(this.homeList,'1212')
          }
        });
    }
  }
};
</script>
<style scoped>
.line-up {
  margin-top: 0.4rem;
  display: flex;
  justify-content: center;
}
.line-up .team-list{
  width: 2.1rem;
}
.team-away{
  text-align: right;
}
.line-up .list-title,.team-list .item{
  display: flex;
  align-items: center;
  height: 0.62rem;
  border-bottom: 1px solid #DDDDDD;
}
.team-list .item{
  font-size: .14rem;
}
.team-list .item em{
  display: inline-block;
  width:.22rem;
height:.22rem;
color: #ffffff;
line-height: .22rem;
text-align: center;
font-size: .12rem;
background:rgba(251,195,31,1);
border-radius:50%;
}
.team-away .item em{
  background: #2872FA;
}
.team-list .item img{
  width: .36rem;
  height: .36rem;
  border-radius: 50%;
  margin: 0 .1rem;
}
.team-away .list-title,.team-away .item{
  justify-content: flex-end;
}
.line-up .list-title img{
  height: .32rem;
  margin-right: .1rem;
}
.line-up .team-away .list-title img{
  margin-left: .1rem;
  margin-right: 0;
}
/* 如果7行要拉伸 */

.live-lineup {
  height: 10rem;
  width: 4.2rem;
  background: url("../../static/ic_match_field.png") no-repeat center;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
}
/* .live-lineup.on {
  height: 16.56rem;
  width: 100%;
  background: url("../../static/ic_match_field.png") no-repeat center;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
} */

/* 阵容布局 */

.live-lineup .first-lineup-msg,
.live-lineup .second-lineup-msg {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 0.44rem;
}

/*第一队教练信息*/

.lineup-name {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
}

.first-lineup-msg em,
.second-lineup-msg em {
  font-size: 0.14rem;
  color: #ffffff;
  margin-right: 0.06rem;
}

.lineup-name img {
  height: 0.3rem;
  margin-left: 0.06rem;
}

.lineup-name span {
  display: inline-block;
  height: 0.2rem;
  border-radius: 0.1rem;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.12rem;
  font-weight: 600;
  line-height: 0.2rem;
  padding: 0 0.15rem;
  margin-left: 0.1rem;
}

.lineup-name em {
  display: inline-block;
  margin-right: 0rem;
  margin-left: 0.16rem;
  font-size: 0.14rem;
}

/**第一队阵容*/

.first-lineup-item,
.second-lineup-item {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.05rem;
}

.first-lineup-item span,
.second-lineup-item span {
  margin-top: 0.04rem;
  font-size: 0.12rem;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0.9rem;
}

.lineup-member {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  flex-direction: column;
  width: 19.5%;
  margin: 0.1rem;
}

.lineup-member img {
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
}

/*第二队阵容 */

/* .second-lineup {
    margin-top: 1.56rem;
} */

.second-lineup-fourth {
  margin-bottom: 0;
}
</style>
