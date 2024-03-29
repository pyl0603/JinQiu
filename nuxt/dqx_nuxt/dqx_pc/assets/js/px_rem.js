// 750的原稿1rem=28px
window.onload = function () {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone) {
        var myHTML = document.querySelector("html"),
            myWidth = window.innerWidth;
        var font = 3 * myWidth / 80;
        if (font > 24) {
            font = 24;
        };
        myHTML.style.fontSize = font + 'px';
        window.onresize = function () {
            var myHTML = document.querySelector("html"),
                myWidth = window.innerWidth;
            var font = 3 * myWidth / 80;
            if (font > 24) {
                font = 24;
            };
            myHTML.style.fontSize = font + 'px';
        }

    }
}