import { getPreMatches } from "@/api/live.js";
import { formatTime } from "@/utils/index.js";
import { getCatLive } from '@/api/adv'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [],
      adMsg:{resType:''},
      adImg:''
    };
  },
  filters: {
    formatTime(time) {
      let times = time < 10000000000 ? time * 1000 : time;
      var date = new Date(times);
      return formatTime(date);
    }
  },
  mounted() {
    if (this.data.id) {
      this.getList(this.data.streamer.userId);
    }
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
    getList(val) {
      getPreMatches(val, {
        page: 1,
        page_size: 20
      }).then(res => {
        this.list = res.data;
      });
    }
  },
  watch: {
    data(newVal) {
      console.log('===>1', newVal)
      getCatLive(newVal.streamer.category.value).then(res => {
        this.adImg = res.data ?  res.data.image : '';
        this.adMsg = res.data;
      })
      this.getList(newVal.streamer.userId);
    }
  }
};