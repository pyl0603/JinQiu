import Video from "@/components/Video";
import { banner, schedule, anchor, scheduleRoomId } from "@/api/home";
import { getPre, getLive } from "@/api/live";
import { getHome } from '@/api/adv'
import { formatDateTxt } from "@/utils/index.js";
export default {
  data() {
    return {
      url:
        "",
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 4,
        observer: true,
        observeParents: true,
        loop: false,
        // loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
      },
      swiperOptionM:{
        slidesPerView: 2.3,
        spaceBetween: 10,
        slidesPerGroup: 2,
        observer: true,
        observeParents: true,
        loop: false,
        loopFillGroupWithBlank: true
      },
      swiperOptionss:{
        // effect: "fade",
        // autoplay: true, //可选选项，自动滑动
        // delay: 6000,
        notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        //direction: "vertical", //水平方向移动
        grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        mousewheel: false, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
        mousewheelControl: false, //同上
        observer: true,
        observeParents: true,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
        },

      },
      itemIndex: 0,
      currentTab: 0,
      items: [
        { name: "足球", value: 0 },
        { name: "篮球", value: 1 }
      ],
      bannerList: [],
      scheduleList: [],
      anchorList: [],
      liveList: [],
      channelList: [],
      isLive: false,
      data: {},
      streamer: {},
      status: 1,
      bannerId: 20,
      adMsg:{resType:''},
      adImg:'',
      bannerListAll:''
    };
  },
  
  async mounted() {
    this.banners();
    this.schedules(this.currentTab, { page: 1, page_size: 15 });
    this.anchors();
    getPre().then(res => {
      this.channelList = res.data;
      console.log('22',this.channelList)
    });
    let { data } = await getHome()
    this.adMsg = data;
    this.adImg = data ?  data.image : '';
    console.log(data)
  },
  filters: {
    timeToDate(time) {
      let times = time < 10000000000 ? time*1000 : time
      let myYear = new Date().getFullYear();
      let date = new Date(times); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M =
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      let D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      let m =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      return `${h}:${m}`;
    },
    formatTime(time) {
      let times = time < 10000000000 ? time*1000 : time
      var date = new Date(times);
      return formatDateTxt(date);
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
    prev() {
      this.$refs.mySwiper.swiper.slidePrev();
    },
    next() {
      this.$refs.mySwiper.swiper.slideNext();
    },
    changeTab(val, e) {
      this.currentTab = val;
      this.itemIndex = e;
      this.schedules(this.currentTab, { page: 1, page_size: 10 });
    },
    banners() {
      banner().then(res => {
        this.bannerListAll = res.data;
        this.bannerList = res.data.slice(1, 5);
        this.bannerId = res.data[0].target
        this.getLiveDetail(this.bannerId, {protocol: 2})
      });
    },
    schedules(category, params) {
      schedule(category, params).then(res => {
        this.scheduleList = res.data || [];
      });
    },
    anchors() {
      const params = {
        page: 1,
        page_size: 10
      };
      anchor(params).then(res => {
        this.anchorList = res.data;
      });
    },
   // 获得直播间详情
		async getLiveDetail (id, parmas) {
			const res = await getLive(id, parmas);
			console.log('res', res);
			if (res.data.code === 949) {
					this.isLive = false
					return
			} 
			this.data = res.data;
			this.streamer = res.data.streamer;
			this.status = this.streamer.status.value;
			const pullStreamingAddress = this.data.pullStreamingAddress;
			if (pullStreamingAddress && this.status === 1) {
				this.isLive = true
			}
    },
    // 进入直播间
    toRoom(item,val) {
      const id = item.target
      const category = item.category
      if(val){
        this.$router.push({path: '/Room/m_index', query: {id: id}})
      }else{
        this.$router.push({path: '/room', query: {id: id}})
      }
    },
    toRoomTop(item,val) {
      console.log(item)
      const id = item.roomNumber
      const category = item.category || 0
      if(val){
        this.$router.push({path: '/Room/m_index', query: {id: id}})
      }else{
        this.$router.push({path: '/room', query: {id: id}})
      }
    },
    goMoreFun(val){
      let channelid = val.channel.id
      let title = val.channel.name
      this.$router.push({path: '/schedule/m_match', query: {channelid: channelid,title:title}})
    },
    // 更多赛程
    moreSchedule(val) {
      this.$refs.mySwiper.swiper.preventClicks = true
      if(val){
        this.$router.push('/Schedule/m_index')
      }
      else{
        this.$router.push('/schedule')
      }
    },
    toSchedule(item,val) {
      if (item.isPredict) {
        const category = item.category.value
        const matchId = item.id
        console.log(category, matchId)
        scheduleRoomId(category, matchId).then(res => {
          const data = res.data
          if (data) {
            this.$refs.mySwiper.swiper.preventClicks = true
            if(val){
              this.$router.push({path: '/Room/m_index', query: {id: data}})
            }else{
              this.$router.push({path: '/room', query: {id: data}})
            }
          }
        })
      }
    }
  },
  	watch: {
		// 实时监听数据变化
		data(newVal) {
			this.data = newVal
			this.streamer = this.data.streamer;
			this.status = this.streamer.status.value;
			const pullStreamingAddress =  this.data.pullStreamingAddress;
			console.log(pullStreamingAddress)
			if (pullStreamingAddress && this.status === 1) {
					this.isLive = true
					this.url = pullStreamingAddress ? pullStreamingAddress.highPullUrl:null
			}
			console.log(this.url)
		},
	}
};