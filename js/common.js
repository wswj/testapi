//验证手机号码格式是否正确
function isPhoneNumber(phone) {
    if (!(/^1[123456789]\d{9}$/.test(phone))) {
        return false;
    } else {
        return true;
    }
}