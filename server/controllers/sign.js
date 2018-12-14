// console.log("1");
//导入http模块
const http = require('http');
//导入qcloud,对mysql数据库进行操作
const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    // console.log(ctx.request.query);
    const {openid,nickName,add} = ctx.request.query;
    //去数据库中查询是否有此人
    // console.log(result);
    // console.log(openid,nickName);
    if(nickName){
        // console.log("1");
        let counts = 1;
        //说明第一次签到
        await mysql('signs')
                .insert({openid,counts,nickName});
        ctx.state.data = {
            code:'1',
            msg:'第一次签到成功'
        }
    }else{
        //说明不是第一次签到
        //首先查询是否有此人,没有的话往前台显示0
        //有的话进行加1操作
        const result = await mysql('signs')
                            .select('signs.counts')
                            .where('openid',openid)
        if(result){
            // console.log(result);
            let addCount = await mysql('signs')
                                    .select('signs.counts')
                                    .where('openid',openid)
            if(add){
                await mysql('signs')
                                    .where('openid',openid)
                                    .increment('counts',1)    
            }
            ctx.state.data = {
                code:'0',
                counts:addCount[0].counts,
                msg:'签到成功'
            }
            
        }else{
            //没有签过到
            //前台返回0次
            ctx.state.data = {
                code:'-1',
                msg:'还未签过到'
            }
        }
    }
}