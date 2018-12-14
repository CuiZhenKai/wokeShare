//导入http模块
const http = require('http');
//导入qcloud,对mysql数据库进行操作
const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    // console.log(ctx.request.body);
    const {openid,datas} = ctx.request.body;
    await mysql('loves')
            .insert({openid,datas})

    ctx.state.data = {
        code:'1',
        msg:'收藏成功'
    }
}