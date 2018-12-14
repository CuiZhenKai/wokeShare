
//导入http模块
const http = require('http');
//导入qcloud,对mysql数据库进行操作
const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    const {openid} = ctx.request.query;
    // console.log(openid);
    const result = await mysql('loves')
            .select('loves.*')
            .where('loves.openid',openid);
    ctx.state.data = {
        code:'1',
        data:result,
        msg:'返回数据'
    }
}