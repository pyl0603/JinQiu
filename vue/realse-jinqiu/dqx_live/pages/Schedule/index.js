import { getPreMatch } from '@/api/match';
import { formatTime, formatTimeHHmm } from "@/utils/index.js";

export default {
  data() {
    return {
      data: [],
      channel: [],
      pagination: {
        currentPage: 1,
        totalPages: 1
      },
      category: 0,
      start: new Date().getTime(),
      end: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime(),
      dateList: [],
      currentDate: '',
      currntIndex: 0,
      anchorCurrent: 1,
      anchorList: [],
      startY: 0,
      startX: 0,
      items: [
        { name: "足球", value: 0 },
        { name: "篮球", value: 1 }
      ],
      itemIndex: 0
    };
  },
  filters: {
    formatTime(time) {
      let times = time < 10000000000 ? time * 1000 : time
      var date = new Date(times);
      return formatTime(date);
    },
    formatTimeHHmm(time) {
      let times = time < 10000000000 ? time * 1000 : time
      var date = new Date(times);
      return formatTimeHHmm(date);
    },
  },
  methods: {
    moreFun(val, e, title) {
      console.log(title)
      let titles = `${title.homeName}VS${title.awayName}`
      this.$router.push({ path: '/schedule/m_match', query: { category: val, matchId: e, title: titles } })
    },
    handleTableChange(pagination) {
      console.log(pagination)
    },
    getList() {
      getPreMatch(this.category, { page: this.pagination.currentPage, page_size: 10, start: this.start, end: this.end }).then(res => {
        this.pagination = res.meta.pagination
        this.data = res.data;
      })
    },
    getListM() {
      getPreMatch(this.category, { page: this.pagination.currentPage, page_size: 10, start: this.start, end: this.end }).then(res => {
        this.pagination = res.meta.pagination
        if (this.pagination.currentPage == 1) {
          this.data = res.data;
        } else {
          this.data = this.data.concat(res.data);
        }
      })
    },
    getDateFormat(time) {
      let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let date = new Date(time);
      let isTody = date.getDate() === new Date().getDate() || false
      let M = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      let D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let w = weekday[date.getDay()]
      let start = isTody ? new Date().getTime() : new Date(new Date(new Date(date).toLocaleDateString()).getTime());
      let end = new Date(new Date(date.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
      return {
        week: w,
        date: `${M}月${D}日`,
        time: time,
        start: new Date(start).getTime(),
        end: new Date(end).getTime()
      }
    },
    getDateList() {
      let current = new Date();
      let list = []
      let currentDate = this.getDateFormat(current.getTime())
      list.push(currentDate)
      this.currentDate = `${currentDate.date}  ${currentDate.week}`;
      for (let i = 1; i < 7; i++) {
        let item = current.getDate() + 1
        let date = current.setDate(item)
        list.push(this.getDateFormat(date))
      }
      this.dateList = list;
      console.log(list)
    },
    changeDateTab(item, index) {
      console.log(item)
      this.currntIndex = index;
      this.currentDate = item.date + item.week
      this.start = item.start
      this.end = item.end
      this.pagination.currentPage = 1
      this.getList()
      this.getListM()
    },
    changeTab(val) {
      console.log(val)
      this.category = val
      this.getList()
      this.getListM()
    },
    changeTabM(val, e) {
      this.itemIndex = e;
      this.category = val
      this.getListM()
    },
    prev() {
      this.anchorCurrent = 1
    },
    next() {
      this.anchorCurrent = 2
    },
    // 进入直播间
    toRoom(item) {
      const id = item.roomNumber
      const category = item.category
      this.$router.push({ path: '/room', query: { id: id } })
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
        this.scrollToEnd(e)
      }
    },
    scrollToEnd(e) {
      let scrollHeight = this.$el.scrollHeight;
      let clientHeight = this.$el.clientHeight;
      let scrollTop = this.$el.scrollTop;

      if (scrollTop + clientHeight >= scrollHeight) {
        ++this.pagination.currentPage
        console.log(this.pagination.currentPage, this.pagination.totalPages)
        if (this.pagination.currentPage > this.pagination.totalPages) {
          return
        }
        this.getListM()
      }
    },
  },
};