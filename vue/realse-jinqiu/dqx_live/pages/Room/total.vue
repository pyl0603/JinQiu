<template>
  <div class="total scroll">
        <!-- 小节得分 -->
        <div class="score-four" v-if="1 < data.status &&  data.status < 11">
            <table>
                <thead>
                    <td>球队</td>
                    <td>Q1</td>
                    <td>Q2</td>
                    <td>Q3</td>
                    <td>Q4</td>
                    <td v-if="data.home.score.scoreAddTime != 0 && data.away.score.scoreAddTime != 0">OT</td>
                    <td>总分</td>
                </thead>
                <tbody>
                    <tr>
                        <td><img :src="data.home.logo" alt=""></td>
                        <td v-for="(item,index) in homeList" :key="index">
                            {{item.home}}
                        </td>
                        <!-- <td >{{data.home.score.score1}}</td>
                        <td>{{data.home.score.score2}}</td>
                        <td>{{data.home.score.score3}}</td>
                        <td>{{data.home.score.score4}}</td> -->
                        <td v-if="data.home.score.scoreAddTime != 0 && data.away.score.scoreAddTime != 0">{{data.home.score.scoreAddTime}}</td>
                        <td>{{data.home.score.score}}</td>
                    </tr>
                    <tr>
                        <td><img :src="data.away.logo" alt=""></td>
                        <td v-for="(item,index) in homeList" :key="index">
                            {{item.away}}
                        </td>
                        <!-- <td>{{data.away.score.score1}}</td>
                        <td>{{data.away.score.score2}}</td>
                        <td>{{data.away.score.score3}}</td>
                        <td>{{data.away.score.score4}}</td> -->
                        <td v-if="data.home.score.scoreAddTime != 0 && data.away.score.scoreAddTime != 0">{{data.away.score.scoreAddTime}}</td>
                        <td>{{data.away.score.score}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 本场最佳 -->
        <div class="match-tops" v-if="topsList.length > 0">
            <div class="title">本场最佳</div>
            <div class="bball-team">
                <div class="item home">
                    <img :src="data.home.logo" alt="">
                    <span>{{data.home.short_name_zh || data.home.name_zh}}</span>
                </div>
                <div class="item away">
                    <span>{{data.away.short_name_zh || data.away.name_zh}}</span>
                    <img :src="data.away.logo" alt="">
                </div>
            </div>
            <div class="tops-list">
                <div class="tops-item" v-for="(item,index) in topsList" :key="index">
                    <div class="tops-cont">
                        <div class="left-items">
                            <img :src="item.homePlayer.logo" alt="">
                            <span>{{item.homePlayer.count}}</span>
                            <em :style="{height:(item.homePlayer.count > item.awayPlayer.count ? 1.2 : (item.homePlayer.count/item.awayPlayer.count)*1.2) + 'rem'}"></em>
                        </div>
                        <div class="right-items">
                            <em :style="{height:(item.awayPlayer.count > item.homePlayer.count ? 1.2 : (item.awayPlayer.count/item.homePlayer.count)*1.2) + 'rem'}"></em>
                            <span>{{item.awayPlayer.count}}</span>
                            <img :src="item.awayPlayer.logo" alt="">
                        </div>
                    </div>
                    <div class="tops-title">
                        <em>{{item.homePlayer.name}}</em>
                        {{item.title}}
                        <em>{{item.awayPlayer.name}}</em>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import axios from "axios";
import { getTotal } from '@/api/match'
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
  data(){
    return{
      defaultImg: 'this.src="./img/def_nav_portrait.png "',
            data: { away: { score: {} }, home: { score: {} }, status: null },
            list: [],
            matchTime: '',
            topsList:[],
            homeList:[],
            awayList:[]
    }
  },
  mounted() {
            let id = this.matchVo.id;
            getTotal(id).then(res => {
                this.data = res.data
                this.topsList = res.data.tops;
                this.list = res.data.stats;
                this.homeList = res.data.table.slice(0, 4)
            })
            
        }
}
</script>
<style scoped>
.total{
  margin-top: .4rem;
  width: 92%;
  margin-left: 4%;
}
  .score-four table {
    width: 100%;
    text-align: center;
    color: #171717;
}

.score-four table thead {
    background: #f8f8f8;
    height: .5rem;
    line-height: .5rem;
    font-size: .18rem;
}

.score-four table tbody {
    width: 92%;
    padding: 0 4%;
    font-size: .24rem;
}

.score-four table tbody tr+tr {
    border-top: 1px solid #eeeeee;
}

.score-four table tbody tr {
    height: .5rem;
    line-height: .5rem;
}

.score-four table tbody img {
    width: .36rem;
    height: .36rem;
    border-radius: 50%;
    margin-top: .05rem;
}
.match-tops .title {
    padding: 0 4%;
    display: block;
    font-size: .24rem;
    color: #171717;
    height: .8rem;
    font-weight: bold;
    text-align: left;
    line-height: .8rem;
}
.bball-team {
    display: flex;
    justify-content: space-between;
    padding: .2rem 4%;
    font-size: .24rem;
    color: #171717;
    line-height: .36rem;
}

.bball-team img {
    width: .36rem;
    height: .36rem;
    border-radius: 50%;
}

.bball-team .home img {
    margin-right: .1rem;
}

.bball-team .away img {
    margin-left: .1rem;
}
.tops-list {
    padding-bottom: .3rem;
}

.tops-list .tops-item {
    padding: 0 4%;
    margin-top: .5rem;
}

.tops-list .tops-item .tops-cont {
    display: flex;
    justify-content: space-between;
}

.tops-list .tops-item .tops-cont .left-items {
    display: flex;
    justify-content: space-between;
    padding-bottom: .05rem;
    width: 47%;
    border-bottom: .04rem solid #FBC31F;
    font-size: .28rem;
    color: #FBC31F;
    align-items: flex-end;
}

.tops-list .tops-item .tops-cont .right-items {
    display: flex;
    justify-content: space-between;
    padding-bottom: .05rem;
    width: 47%;
    border-bottom: .04rem solid #2872FA;
    font-size: .28rem;
    color: #2872FA;
    align-items: flex-end;
}

.tops-list .tops-item span {
    position: relative;
    top: -.3rem;
}

.tops-list .tops-item .left-items em {
    display: inline-block;
    width: .64rem;
    height: 1.2rem;
    background-color: #FBC31F;
}

.tops-list .tops-item .right-items em {
    display: inline-block;
    width: .64rem;
    height: 1.2rem;
    background-color: #2872FA;
}

.tops-list .tops-item .tops-cont img {
    width: 1.2rem;
    height: 1.07rem;
}

.tops-list .tops-item .tops-title {
    display: flex;
    justify-content: space-between;
    margin-top: .2rem;
    font-size: .2rem;
    color: #171717;
}

.tops-list .tops-item .tops-title em {
    display: inline-block;
    width: 40%;
    font-size: .2rem;
}

.tops-list .tops-item .tops-title em:nth-child(2) {
    text-align: right;
}

</style>