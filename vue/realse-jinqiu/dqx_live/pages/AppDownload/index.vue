<template>
  <div class="app_download">
      
      <!-- 中间二维码+图片部分 -->
      <div class="wrap download">
        <div class="downloadin wrap1">
          <div class="app-code">
            <span>今球</span>
            <!-- <em>这里是文案描述暂时放空</em> -->
            <div class="download-code clearfix">
              <div class="ios-code">
                <span>iOS版</span>
                <img src="../../static/downcode.png" alt class="ios-code-img" />
              </div>
              <div class="android-code">
                <span>Android版</span>
                <img src="../../static/downcode.png" alt class="android-code-img" />
              </div>
            </div>
          </div>
          <div class="app-cont">
            <img src="../../static/cont.png" alt />
          </div>
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="wrap swiper">
        <div class="swiperin wrap1">
          <!-- 右侧信息 -->
          <div class="descript">
            <div class="brief">
              <!-- 第一 -->
            <div
              class="lists"
              :class="{selected : itemIndex == 1||itemIndex == 5}"
              @click="goSlide(1)"
            >
              <div class="order">01</div>
              <div class="content">
                <span class="title">推荐 RECOMMEND</span>
                <span class="time">
                  <i class="process-non"></i>
                  <i class="process-act"></i>
                </span>
                <span class="descrption">专业足球篮球赛事资讯，让您足不出户即可掌握世界足坛篮坛新鲜资讯</span>
              </div>
            </div>
            <!-- 第二 -->
            <div
              class="lists"
              :class="{selected : itemIndex == 2,fadeOut : itemIndex == 6}"
              @click="goSlide(2)"
            >
              <div class="order">02</div>
              <div class="content">
                <span class="title">赛事 MATCH</span>
                <span class="time">
                  <i class="process-non"></i>
                  <i class="process-act"></i>
                </span>
                <span class="descrption">网罗各大主流足球篮球赛事，赛前预告、赛后战报和数据分析全都有</span>
              </div>
            </div>
            <!-- 第三 -->
            <div class="lists" :class="{selected : itemIndex == 3}" @click="goSlide(3)">
              <div class="order">03</div>
              <div class="content">
                <span class="title">发现 DISCOVER</span>
                <span class="time">
                  <i class="process-non"></i>
                  <i class="process-act"></i>
                </span>
                <span class="descrption">今球趣谈发现更多与您志同道合的好玩圈子</span>
              </div>
            </div>
            <!-- 第四 -->
            <div class="lists" :class="{selected : itemIndex == 4}" @click="goSlide(4)">
              <div class="order">04</div>
              <div class="content">
                <span class="title">数据  DATA</span>
                <span class="time">
                  <i class="process-non"></i>
                  <i class="process-act"></i>
                </span>
                <span class="descrption">专业赛事数据支持，联赛/杯赛积分榜，球员榜、赛程数据实时</span>
              </div>
            </div>
          </div>
        </div>
          <!-- 右侧轮播图 -->
          <div class="out-bg">
            <div class="swiper-img">
              <img src="../../static/liuhai.png" alt class="shodow-icon" />
              <div class="scaleimg">
                <!-- 第一屏 -->
                <div
                  class="scaleimg-one"
                  :class="{on : itemIndexs == 1}"
                  v-if="itemIndex == 1"
                >
                  <img src="../../static/no1_1.png" />
                </div>
              </div>
              <!-- <div class="swiper-container" ref="swiper" v-swiper:mySwiper="swiperOption" 
              @slideChangeTransitionEnd="slideChangeTransitionEnd"
              @slideChangeTransitionStart="slideChangeTransitionStart">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="../../static/no1.png" alt class="slide-img" />
                  </div>
                  <div class="swiper-slide">
                    <img src="../../static/no2.png" alt class="slide-img" />
                  </div>
                  <div class="swiper-slide">
                    <img src="../../static/no3.png" alt class="slide-img" />
                  </div>
                  <div class="swiper-slide">
                    <img src="../../static/no4.png" alt class="slide-img" />
                  </div>
                </div>
              </div> -->
              <a-carousel ref="varousel" class="swiper-container" :beforeChange="onChange" autoplay dotPosition="left" :dots="false">
                <div class="swiper-slide">
                    <img src="../../static/no1.png" alt class="slide-img" />
                </div>
                <div class="swiper-slide">
                    <img src="../../static/no2.png" alt class="slide-img" />
                </div>
                <div class="swiper-slide">
                    <img src="../../static/no3.png" alt class="slide-img" />
                </div>
                <div class="swiper-slide">
                    <img src="../../static/no4.png" alt class="slide-img" />
                </div>
              </a-carousel>  
            </div>
          </div>
        </div>
      </div>
      
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false, //是否激活样式
      itemIndex: 0, //判断当前页面
      itemIndexs: 0,
      swiperOption: {
        effect: "fade",
        loop: true,
        // autoplay: true, //可选选项，自动滑动
        // delay: 1000,
        notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        direction: "vertical", //水平方向移动
        grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        mousewheel: false, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
        mousewheelControl: false, //同上
        // autoplay: {
        //   delay: 6000,
        //   // disableOnInteraction: false
        // },
        autoplayDisableOnInteraction: false,
        observer:true,
        observeParents:true
      }
    };
  },
  methods: {
    // slideChangeTransitionEnd() {
    //   console.log(this.mySwiper.activeIndex)
    //   this.itemIndex = this.mySwiper.activeIndex;
    //   setTimeout(() => {
    //     this.itemIndexs = this.itemIndex;
    //   }, 1500);
    // },
    // slideChangeTransitionStart() {
    //   this.itemIndex = 6;
    // },
    // goSlide(item) {
    //   this.mySwiper.slideTo(item, 1000, false);
    //   this.itemIndex = item;
    //   setTimeout(() => {
    //     this.itemIndexs = item;
    //   }, 1500);
    // }
    onChange(from, to) {
      this.itemIndex = to +1;
      this.itemIndexs = this.itemIndex
    },
    goSlide(item) {
      console.log(item)
      this.$refs.varousel.goTo(item-1);
    }
  },
  head() {
    return {
      title: "「今球app官网」今球-今日足球资讯网",
      meta: [{ hid: "description", name: "description", content: "hi-Sen" }]
    };
  },
  created() {
    setTimeout(() => {
      this.itemIndex = 1;
    });
    setTimeout(() => {
      this.itemIndexs = 1;
    }, 60);
  },
};
</script>
<style>
.app_download + .for-adv {
  display: none;
}
.app_download.type-area{
  width: 100%;
}
.tab-download em{
  display: inline-block!important;
}

.download {
  height: 520px;
}

.downloadin {
  display: flex;
  justify-content: space-around;
}

.app-code {
  margin-top: 120px;
}

.app-code span {
  display: block;
  font-size: 48px;
  color: #171717;
}

.download-code {
  width: 305px;
  margin-top: 110px;
}

.ios-code,
.android-code {
  background: #fbc31f;
  width: 148px;
  color: #171717;
  border-radius: 4px;
  float: left;
}

.android-code {
  margin-left: 9px;
}

.android-code span {
  display: block;
  font-size: 18px;
  color: #171717;
  padding: 10px 0 10px 0;
  margin-left: 15px;
  background: url("../../static/code.png") no-repeat 98px;
  background-size: 21px;
}

.ios-code span {
  display: block;
  font-size: 18px;
  color: #171717;
  padding: 10px 0 10px 16px;
  margin-left: 15px;
  background: url("../../static/code.png") no-repeat 90px;
  background-size: 21px;
}

.ios-code-img,
.android-code-img {
  width: 118px;
  height: 118px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: none;
  margin-left: 15px;
}

.ios-code span:hover + .ios-code-img,
.android-code span:hover + .android-code-img {
  display: block;
}

.app-cont {
  margin-top: 45px;
  margin-right: 100px;
}

/* 轮播图 */

.out-bg {
  width: 555px;
  text-align: center;
}

.app_download .swiper {
  background: url("../../static/bg.png") no-repeat center;
  background-size: cover;
  height: 800px;
}

.app_download .swiperin {
  display: flex;
  justify-content: space-around;
  padding-top: 0.2rem;
}

.app_download .swiper-img {
  width: 390px;
  height: 800px;
  background: url("../../static/phonebg.png") no-repeat center;
  background-size: 100%;
  margin-top: -106px;
  margin-left: 90px;
}

.app_download .swiper-container {
  width: 555px;
  height: 736px;
  position: absolute;
  z-index: 9;
  overflow-y: hidden;
  margin-top: -37px;
  margin-left: -80px;
}

.app_download .swiper-slide .slide-img {
  width: 339px;
  height: 736px;
  margin-left: -7px;
  border-radius: 35px;
  border: 1px solid #000;
}

.app_download .shodow-icon {
  position: relative;
  z-index: 10;
  width: 386px;
  margin-left: -2px;
}

.scaleimg {
  position: absolute;
  z-index: 11;
}

/* 第一屏 */

.scaleimg-one {
  margin-top: -40px;
  margin-left: 29px;
  opacity: 0;
}

.scaleimg-one img {
  width: 339px;
}

.scaleimg .scaleimg-one.on {
  -webkit-transform: translate(56px, 113px);

  -moz-transform: translate(56px, 113px);

  -ms-transform: translate(56px, 113px);

  -o-transform: translate(56px, 113px);

  transform: translate(56px, 113px);
  -webkit-transition: -webkit-transform 1.5s;
  transition: -webkit-transform 1.5s;
  -o-transition: -o-transform 1.5s;
  -moz-transition: transform 1.5s, -moz-transform 1.5s;
  transition: transform 1.5s;
  transition: transform 1.5s, -webkit-transform 1.5s, -moz-transform 1.5s,
    -o-transform 1.5s;
  -webkit-transition: all 1.5s;

  -moz-transition: all 1.5s;

  -o-transition: all 1.5s;

  transition: all 1.5s;

  opacity: 1;
}

/* 第二屏 */

.scaleimg-two div:first-child img {
  width: 339px;
  margin-top: 214px;
  margin-left: 29px;
  opacity: 0;
}

.scaleimg-two.on div:first-child img {
  transform: scale(1.63);
  transition: transform 0.4s;
  margin-top: 167px;
  opacity: 1;
}

.scaleimg-two div:nth-child(2) img {
  width: 339px;
  margin-left: 29px;
  margin-top: 193px;
  opacity: 0;
}

.scaleimg-two.on div:nth-child(2) img {
  transform: scale(1.4);
  transition: transform 0.4s;
  margin-top: 167px;
  opacity: 1;
}

/* 第三屏 */

.scaleimg-three {
  margin-top: 340px;
  margin-left: 29px;
  opacity: 0;
}

.scaleimg-three img {
  width: 339px;
}

.scaleimg-three.on {
  margin-top: 355px;
  opacity: 1;
}

.scaleimg-three.on img {
  transform: scale(1.63);
  transition: transform 0.4s;
  transform-origin: 50% 50% 0;
  /*以左上角为起点*/
  /* transition-delay: 2s; */
}

/* 第四屏 */

.scaleimg-four {
  margin-top: 500px;
  margin-left: 29px;
  opacity: 0;
}

.pos_center {
  display: flex;
  align-items: center;
  height: 50px;
}

.scaleimg-four img {
  width: 339px;
}

.scaleimg-four.on {
  margin-top: 512px;
  opacity: 1;
}

.scaleimg-four.on img {
  transform: scale(1.45);
  transition: transform 0.4s;
  transform-origin: 50% 50% 0;
  /*以左上角为起点*/
}

*/
        /* 进度条 */

        .brief {
  margin-top: 135px;
}

.lists {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #171717;
  margin-bottom: 60px;
}

.brief .selected .title {
  transform: scale(2, 2);
  transition: transform 1s;
  transform-origin: 0 0 0;
  /*以左上角为起点*/
}

.brief .title {
  display: block;
  font-size: 20px;
}

.brief .descrption {
  display: block;
  font-size: 14px;
  opacity: 0.8;
}

.time {
  display: inline-block;
  margin-bottom: 8px;
}

.process-non {
  display: inline-block;
  width: 100px;
  height: 2px;
  background: #ffffff;
  opacity: 0.6;
}

.brief .selected .process-non {
  margin-top: 30px;
  transform: scaleX(2.7);
  transition: transform 1s;
  transform-origin: 0 0 0;
}

.process-act {
  display: inline-block;
  background: #fff;
  height: 2px;
  width: 0;
  position: relative;
  z-index: 1;
  left: -102px;
}

.brief .selected .process-act {
  animation: process 5.9s infinite;
}

.order {
  margin-right: 20px;
  font-size: 20px;
}
.ant-carousel .slick-slide img {
    display: inline-block;
}
@keyframes process {
  from {
    width: 0;
  }

  to {
    width: 270px;
  }
}

</style>