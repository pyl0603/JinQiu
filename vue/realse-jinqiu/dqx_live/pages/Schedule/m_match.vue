<template>
  <div>
    <div class="title">{{ title }}</div>
    <div @touchstart="touchStart($event)" @touchend="touchEnd($event)">
      <MLiveItem :list="list" />
    </div>
  </div>
</template>
<script>
import { getMatchLive,getChannelLive } from "@/api/live";
import MLiveItem from "@/components/m_LiveItem.vue";
export default {
  data() {
    return {
      page: 1,
      totalPages: 1,
      list: [],
      title: ""
    };
  },
  layout: "m_default",
  components: {
    MLiveItem
  },
  methods: {
    getList() {
      let category = this.$route.query.category;
      let matchId = this.$route.query.matchId;
      let channelid = this.$route.query.channelid;
      if (channelid) {
        getChannelLive(channelid,{
          page: this.page,
          page_size: 10
        }).then(res => {
          this.totalPages = res.meta.pagination.totalPages;
          this.list =this.list.concat(res.data);
        });
      } else {
        getMatchLive(category, matchId, {
          page: this.page,
          page_size: 10
        }).then(res => {
          this.totalPages = res.meta.pagination.totalPages;
          this.list =this.list.concat(res.data);
        });
      }
    },
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startX = e.targetTouches[0].pageX;
    },
    touchEnd(e) {
      let endX = e.changedTouches[0].pageX,
        endY = e.changedTouches[0].pageY,
        dy = this.startY - endY,
        dx = endX - this.startX;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return;
      }
      if (endY < this.startY) {
        this.scrollToEnd(e);
      }
    },
    async scrollToEnd(e) {
      let scrollHeight = this.$el.scrollHeight;
      let clientHeight = this.$el.clientHeight;
      let scrollTop = this.$el.scrollTop;

      if (scrollTop + clientHeight >= scrollHeight) {
        ++this.page;
        if (this.page > this.totalPages) {
          return;
        }
        this.getList();
      }
    }
  },
  async mounted() {
    this.title = this.$route.query.title;
    // let { data } = await getMatchLive(category,matchId,{page:this.page,page_size:10})
    this.getList();
  }
};
</script>
<style scoped>
.title {
  font-size: 0.32rem;
  color: #070002;
  text-align: center;
  padding-top: 0.2rem;
}
</style>
