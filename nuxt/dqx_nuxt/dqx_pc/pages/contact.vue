<template>
  <div class="content">
    <!-- 头部 -->
    <!-- <div class="wrap header">
      <div class="wrap1 headerin">
      </div>
    </div> -->
    <!-- 中间内容 -->
    <div class="cont">
      <div class="cooperation">
        <span>商务合作</span>
        <em>duoquxiang@sina.com</em>
      </div>
      <div class="address">
        <span>联系方式</span>
        <em>联系电话：0592-5575923</em>
        <em>地址：福建省厦门市思明区吕岭路宝龙一城东塔</em>
      </div>
    </div>
  </div>
</template>
<style>
.tab a{
  color: #fff!important;
}
.tab-cantact em{
  display: inline-block!important;
}
.cont{
  min-height: calc(100vh - 669px);
  width: 1200px;
  margin: 0 auto;
}
/* 中间内容 */
.cooperation {
  margin-top: 30px;
}
.cooperation span {
  padding-left: 38px;
  background: url("~assets/img/shangwu.png") no-repeat left;
  -o-background-size: 27px 20px;
  background-size: 27px 20px;
  font-size: 22px;
  color: #171717;
}
.address {
  margin-top: 35px;
}
.address span {
  padding-left: 38px;
  background: url("~assets/img/dizhi.png") no-repeat left;
  -o-background-size: 20px 21px;
  background-size: 20px 21px;
  font-size: 22px;
  color: #171717;
}
.cont {
  text-align: center;
}
.cont em {
  display: block;
  text-align: center;
  font-size: 16px;
  color: #171717;
  margin-top: 10px;
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
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
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
  background: url("~assets/img/img_contact.png") no-repeat center;
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
  position: absolute;
  bottom: 0;
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
