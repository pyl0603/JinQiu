import { getChannels, getChannelLive } from "@/api/live";
import { getLive } from '@/api/adv'
export default {
  data() {
    return {
      channel: [],
      page: 1,
      channelId: null,
      liveList: [],
      itemIndex: 0,
      adMsg:{resType:''},
      adImg: ""
    };
  },
  async created() {
    let { data } = await getChannels();
    this.channel = data;
    this.channelId = data[0].id;
    let img = await getLive();
    this.adMsg = img.data;
    this.adImg = img.data ?  img.data.image : '';
  },
  methods: {
    advFun(e){
      console.log(e.resType.value)
      if(e.resType.value === 7){
        this.$router.push({path: '/room', query: {id: e.resId}})
      }else{
        window.location.href = e.resUrl
      }
    },
    // 切换频道
    ChooseChannel(val, e) {
      this.channelId = val;
      this.itemIndex = e;
    },
    getList() {
      getChannelLive(this.channelId, { page: this.page, page_size: 10 }).then(
        res => {
          this.liveList = res.data;
        }
      );
    }
  },
  watch: {
    channelId(newVal) {
      this.getList();
    }
  }
};