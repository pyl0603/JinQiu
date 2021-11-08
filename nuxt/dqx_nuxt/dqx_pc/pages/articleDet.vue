<template>
  <div class="content">
    <div class="cont-det">
      <div class="news-det">
        <div class="news-page-title">
          <em @click="goHome">首页</em> > 新闻详情
        </div>
        <div class="news-title">{{newsInfo.title}}</div>
        <div class="news-info">
          <span>{{newsInfo.author}}</span>
          <em>{{newsInfo.updateTime | formatTime }}</em>
        </div>
        <div class="news-subhead" v-if="newsInfo.subhead !=''">{{newsInfo.subhead}}</div>
        <div class="news-cont" v-html="newsInfo.content"></div>
      </div>
      <!-- 推荐 -->
      <div class="news-rec">
        <div class="cont-title">精彩推荐</div>
        <div
          class="news-item"
          v-for="item in newsList"
          :key="item.id"
          @click="refreshData(item.id)"
        >
          <img :src="item.imageUrl" :alt="item.title" />
          <div>
            <span>{{item.title}}</span>
            <em>{{item.updateTime | formatTime}}</em>
          </div>
        </div>
        <div class="no-result" v-if="newsList.length == 0">
          <img src="~assets/img/list_no.png" alt />
          <span>暂无相关推荐</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { formatTime } from "@/assets/js/index.js";
// const baseUrl = `http://192.168.1.200:9000/client-app`;
const baseUrl = `https://api.jinqiulive.com/client-app`
export default {
  filters: {
    formatTime(time) {
      var date = new Date(time);
      return formatTime(date);
    }
  },
  async asyncData({ query }) {
    let [newsInfo, newsList] = await Promise.all([
      axios({
        method: "get",
        params: { id: query.id },
        url: baseUrl + `/article/detail`
      }),
      axios({
        method: "get",
        params: { id: query.id },
        url: baseUrl + `/article/recommend`
      })
    ]);
    return { newsInfo: newsInfo.data.data, newsList: newsList.data.data };
  },

  head() {
    return {
      title: this.newsInfo.title
    };
  },
  methods: {
    // 点击推荐
    async refreshData(val) {
      this.$router.push({ name: "articleDet", query: { id: val } });
    },
    //  跳转的到首页
    async goHome() {
      this.$router.push("/");
    }
  },
  watch: {
    $route() {
      this.$axios({
         method: "get",
        params: { id: this.$route.query.id },
        url: baseUrl + `/article/detail`
      }).then(res => {
        this.newsInfo = res.data.data;
      });
      this.$axios({
         method: "get",
        params: { id: this.$route.query.id },
        url: baseUrl + `/article/recommend`
      }).then(res => {
        this.newsList = res.data.data;
      });
    }
  }
};
</script>
<style>
.no-result {
  text-align: center;
  margin-top: 80px;
}
.no-result span {
  display: block;
  font-size: 16px;
  color: #adadad;
  margin-top: 20px;
}
.no-result img {
  width: 300px;
}
.content {
  min-height: calc(100vh - 140px);
  width: 1200px;
  margin: 0 auto;
}
.cont {
  min-height: -webkit-calc(100vh - 140px);
  min-height: -moz-calc(100vh - 140px);
  min-height: calc(100vh - 140px);
  width: 960px;
  margin: 0 auto;
}
.news-page-title {
  display: block;
  color: #424242;
  font-size: 12px;
  height: 20px;
  padding: 24px 0;
}
.news-page-title em {
  cursor: pointer;
}
.cont-det {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}
.news-det {
  width: 580px;
  margin-right: 90px;
  flex: 1;
}
.news-title {
  font-size: 22px;
  line-height: 30px;
}
.news-info {
  margin: 20px 0;
}
.news-info span {
  display: inline-block;
  font-size: 12px;
  margin-right: 20px;
}
.news-info em {
  font-size: 12px;
  color: #999999;
}
.news-subhead {
  padding: 20px;
  width: 540px;
  background: #f5f5f5;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #424242;
}
.news-cont {
  width: 580px;
  margin-bottom: 20px;
}
.news-cont >>> p img {
  width: 100%;
  margin: 10px 0;
}
.news-cont >>> p {
  margin-top: 20px;
  font-size: 14px;
  line-height: 20px;
}
.news-rec {
  width: 358px;
  margin-top: 30px;
}
.news-item {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
  -moz-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
}
.news-item span {
  display: block;
  height: 50px;
  line-height: 25px;
  color: #171717;
  font-size: 16px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.news-item em {
  display: block;
  color: #adadad;
  font-size: 14px;
  margin-top: 20px;
}
.news-item img {
  display: block;
  width: 122px;
  height: 80px;
  margin-right: 20px;
}
.news-item div {
  flex: 1;
}
.cont-title {
  font-size: 18px;
  color: #171717;
  padding-bottom: 10px;
  border-bottom: 2px solid #fbc31f;
}
</style>