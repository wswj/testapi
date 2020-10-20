//基础请求地址
var baseurl = "http://192.168.0.82:8088/api/";
//ajax封装
function _ajax(url, callback, data) {
    var token = $api.getStorage('token');
    var app = {
        winWidth: api.winWidth,
        winHeight: api.winHeight,
        appName: api.appName,
        appVersion: api.version,
        systemType: api.systemType,
        version: api.version,
        systemVersion: api.systemVersion,
        deviceId: api.deviceId,
        deviceToken: api.deviceToken,
        deviceName: api.deviceName,
        uiMode: api.uiMode,
        operator: api.operator,
        connectionType: api.connectionType,
        screenWidth: api.screenWidth,
        screenHeight: api.screenHeight,
        winName: api.winName,
        channel: api.channel,
        sign: sign()
    };
    //判断传入的数据是否为空,如果为空直接将token和app作为参数提交,否则如果不为空将token,app和传入的参数拼接成新的字符串作为提交数据
    if (data) {
        var json = {};
        var json1 = data;
        var json2 = { token: token, app: app };
        data = eval('(' + (JSON.stringify(json1) + JSON.stringify(json2)).replace(/}{/, ',') + ')');
    } else {
        var json = {};
        data = {
            token: token,
            app: app
        };
    }
    api.ajax({
        url: baseurl + url,
        method: 'post',
        data: {
            values: data
        },
        cache: true

    }, callback);
}

function sign() {
    var iv = CryptoJS.enc.Latin1.parse('www_videos_com');
    var key = CryptoJS.enc.Latin1.parse('20200217143510WB');
    var encoded = CryptoJS.AES.encrypt(_sign_key() + '####' + sign, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        adding: CryptoJS.pad.ZeroPadding
    }).toString()
    return encoded;
}

function _sign_key() {
    var outTradeNo = ""; //订单号
    for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
    {
        outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = new Date().getTime() + outTradeNo; //时间戳，用来生成订单号。
    return outTradeNo;
}
//底部导航栏跳转封装
function _index_win(winNAme) {
    if (winNAme == "home") {
        return home();
    }
    if (winNAme == "shop") {
        return shop();
    }
    if (winNAme == "task" || winNAme == "member") {
        if (!$api.getStorage('user')) {
            return login();
        }
    }
    url = winNAme;
    //打开tabLayout布局
    //本方法继承了openWin方法的所有参数，同时在此基础上增加了navigationBar、tabBar等参数，来设置和使用原生的顶部导航栏和底部标签栏，可以通过closeWin方法来关闭页面。
    api.openTabLayout({
        name: winNAme,
        url: "./" + winNAme + '.html',
        useWkWebView: true,
        animation: {
            type: "none",
        },
        bounces: false,
        slidBackEnable: false
    });
}

function login() {
    //打开tabLayout布局
    //本方法继承了openWin方法的所有参数，同时在此基础上增加了navigationBar、tabBar等参数，来设置和使用原生的顶部导航栏和底部标签栏，可以通过closeWin方法来关闭页面。
    api.openTabLayout({
        name: 'login',
        url: "./login.html",
        reload: true,

    });
}
//打开商品页面
function shop() {
    //打开tabLayout布局
    //本方法继承了openWin方法的所有参数，同时在此基础上增加了navigationBar、tabBar等参数，来设置和使用原生的顶部导航栏和底部标签栏，可以通过closeWin方法来关闭页面。
    api.openTabLayout({
        name: "shop",
        url: "./shop.html",
        useWkWebView: true,
        bounces: false
    });
}
//获取应用配置信息
function appConfig() {
    _ajax('video/config', function(ret, err) {
        if (ret) {
            $api.setStorage('config', ret);
        } else {

        }
    })
}