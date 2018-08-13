
// const host = 'httP://192.168.1.166:8080'
// const host2 = 'http://shidewei.yicucheng.com'

const host = ''
const host2 = ''

export default{

    //微信授权
    wechatapiWxLogin:'/wxAuth/index',
    //判断是否绑定手机号
    juageIsBind:host + '/lcH5/juageIsBind',

    // 判断用户是否登录、获取用户渴望币、手机号
    getUserInfo:host+'/lcH5/isLogin',

    // 绑定手机号
    bindPhone:host+'/lcH5/bindPhone',

    // 获取图片验证码
    getCodeImg:host+'/lcH5/imageTest',

    // 获取所有的商品信息
    // getGoodsList:host+'/lcGoods/getGoodsAllInfo',
    getGoodsList:host2+'/user/exchangePrizeList',


    // 抽奖
    lottery:host+'/lotter/lotterGoods',

    //兑换
    exChange:host+'/lotter/exchangeGoods',

    //中奖记录
    prizeList:host+'/user/prizeList',

    //领取微信红包
    getWXhb:host+'/',

    //领取腾讯动漫点券
    getTXdq:host2+'/receivePrize/recieveTxCdk',

    // 查询用户是否完善过收货地址
    isBindAddr:host+'/user/isFilledAddress',

    //完善地址信息
    saveUserAddr:host2+'/receivePrize/fillAddress',

}
