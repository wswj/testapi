//弹出提示信息
function _msg(title, location, duration) {
    //top            //顶部
    //middle        //中间
    //bottom        //底部
    if (!location) {
        location = 2000
    }
    if (!duration) {
        duration = 'middle'
    }
    api.toast({
        msg: title,
        duration: location,
        location: duration
    });
}