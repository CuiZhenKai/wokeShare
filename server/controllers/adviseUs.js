
//导入http模块
const http = require('http');
//导入qcloud,对mysql数据库进行操作
const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    const {openid,advises} = ctx.request.body;
    // console.log(ctx.request.body);
    await mysql('advise')
            .insert({openid,advises});
    ctx.state.data = {
        code:'1',
        msg:'反馈成功'
    }
}