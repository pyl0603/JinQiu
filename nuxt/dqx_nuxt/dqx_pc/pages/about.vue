<template>
  <div class="pc-index">
    <!-- 头部 -->
    <!-- <div class="wrap header">
      <div class="wrap1 headerin">
      </div>
    </div> -->
    <!-- 中间内容 -->
    <div class="cont">
      <div class="name-top">
        <span class="jinqiu-name">今球</span>
      </div>
      <p>今球APP隶属于厦门市多趣想科技有限公司，是通过互联网体育赛事的平台。目前拥有中国之队、中超、亚冠、中甲、英超、西甲、德甲、意甲、法甲、欧冠、欧联、俄超、足总杯、等重量级体育赛事，形成以足球产业为核心的体育内容矩阵，致力于打造互联网第一体育平台。同时，结合线上服务与线下体验，不断强化其运营能力。</p>
      <p>今球在业内是垂直化独立体育APP，通过强化交互，创造更丰富、更全面的体育内容，结合专业赛事数据支持，实现了7X24小时全时段资讯服务。未来今球APP将从内容运营向用户运营过渡，建立更健全、更完善的用户会员体系，并强化自身品牌势能，用精耕细作的方式更好地为用户服务。</p>
    </div>
  </div>
</template>
<style>
.tab a{
  color: #fff!important;
}
.tab-about em{
  display: inline-block!important;
}
/* 中间内容 */
.cont {
  padding-bottom: 50px;
}
.cont p {
  width: 1120px;
  margin: 0 auto;
  margin-bottom: 50px;
  font-size: 20px;
  color: #999999;
  line-height: 48px;
}
.name-top {
  text-align: center;
  margin: 70px 0;
}
.jinqiu-name {
  font-size: 42px;
  height: 30px;
  border-bottom: 6px solid #fbc31f;
}
.pc-index {
  min-width: 1200px;
  margin: 0 auto;
}
.tab {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 220px;
}
.href-tab {
  margin-left: 250px;
  width: 400px;
}
.tab div {
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  width: 78px;
  text-align: center;
}
.tab div em {
  display: inline-block;
  width: 28px;
  height: 3px;
  background: #fff;
  position: absolute;
  margin-left: -50px;
  margin-top: 30px;
}
.tab span {
  display: inline-block;
  width: 95px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #18ce94;
  border: 1px solid #18ce94;
  border-radius: 15px;
  cursor: pointer;
}
.tab span:hover {
  background: #18ce94;
  color: #fff;
}
.header {
  height: 26vw;
  min-width: 1200px;
  background: url("~assets/img/img_about.png") no-repeat center;
  -o-background-size: cover;
  background-size: cover;
}
.headerin {
  height: 60px;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  color: #424242;
  font-size: 14px;
}

/* 底部 */
.bottom {
  background: #171717;
  height: 40px;
  padding: 20px 0;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.bottom div {
  margin-bottom: 5px;
}
</style>
