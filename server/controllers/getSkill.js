//导入http模块
const http = require('http');
//导入qcloud,对mysql数据库进行操作
const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    // console.log(ctx.request.query);
    const size = 3;
    const {page} = ctx.request.query;
    // console.log("成功");
    const result = await mysql('skills')
            .select('skills.*')
            .orderBy('skills.id','desc')
            .limit(size)
            .offset(Number(page)*size)
    // console.log(result);
    ctx.state.data = {
        code:'0',
        data:result,
        msg:'返回数据列表成功'
    }
}