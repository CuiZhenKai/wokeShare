
//导入http模块
const http = require('http');
//导入qcloud,对mysql数据库进行操作
const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    // console.log("1");
    const {openid,nickName,skillIntro,skillSalary,weChatNum,tag,avatarUrl} = ctx.request.body;
    // console.log(openid,nickName,skillIntro,skillSalary,weChatNum,tag);
    await mysql('skills')
            .insert({openid,nickName,skillIntro,skillSalary,weChatNum,tag,avatarUrl});
    ctx.state.data = {
        code:'1',
        msg:'发布成功'
    }
}