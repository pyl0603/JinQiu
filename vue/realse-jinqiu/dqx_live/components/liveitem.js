
import { getChannels, getPre } from "@/api/live";
export default {
  props: {
    list: {
      type: Array,
      default: () => {}
    }
  },
  created() {
    console.log(this.list)
    getChannels().then(res => {
      console.log(res, 1);
    });
    getPre().then(res => {
      console.log(res, 2);
    });
  },
  methods: {
    // 进入直播间
    toRoom(item,val) {
      const id = item.roomNumber
      // const category = item.category
      if(val){
        this.$router.push({path: '/Room/m_index', query: {id: id}})
      }else{
        this.$router.push({path: '/room', query: {id: id}})
      }
    }
    
  }
};