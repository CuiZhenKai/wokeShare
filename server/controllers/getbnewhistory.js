const http = require('http')

module.exports = async (ctx)=>{
    const {day,month} = ctx.request.query;
    // console.log(day,month);
    let url = `http://api.juheapi.com/japi/toh?key=6ed56da093570b2006aa23bd042fefd8&v=1.0&month=${month}&day=${day}`;

    let news = await getJSON(url);

    // console.log(news)
    ctx.state.data = {
        code:'1',
        data:news
    }

    function getJSON (url) {
        return new Promise((resolve, reject) => {
            http.get(url, res => {
                let urlData = ''
                res.on('data', data => {
                    urlData += data
                })
                res.on('end', data => {
                    const newsInfo = JSON.parse(urlData)
                    // console.log(bookinfo);
                    if (newsInfo.reason) {
                        resolve(newsInfo)
                    } else {
                        reject(newsInfo)
                    }
                })
            })
        })
    }
}