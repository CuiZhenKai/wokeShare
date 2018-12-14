<template>
    <div class="todayInHistory">
        <subTitle :data='todayInHistory'></subTitle>
        <div class="content fix" v-for="item in newsMsg" :key="item._id">
            <div class="img">
                <img :src="item.pic?item.pic:'http://t.wsgxsp.com/uploads/149881997658968.png'" alt="" mode="aspectFit"/>
            </div>
            <div class="rightContent">
                <p class="title">{{item.title}}</p>
                <p class="date">时间:{{item.year}}年{{item.month}}月{{item.day}}日</p>
                <p class="lunar">历史时间:{{item.lunar}}</p>
                <p class="des">简要:{{item.des}}</p>
            </div>
        </div>
    </div>
</template>

<script>
// http://api.juheapi.com/japi/toh?key=6ed56da093570b2006aa23bd042fefd8&v=1.0&month=11&day=1 请求链接
import subTitle from '@/components/subTitle'
import {showToast} from '@/utils/animation.js'
import {get} from '@/utils/request.js'
export default {
  components: {
    subTitle
  },
  created () {
    this.getDayAndDate()
    this.getNews()
    // console.log(this.newsMsg);
  },
  data () {
    return {
      todayInHistory: '历史上的今天',
      day: '',
      month: '',
      newsMsg: []
    }
  },
  methods: {
    getDayAndDate () {
      let getD = new Date()
      let days = getD.getDate()
      let months = getD.getMonth() + 1
      this.day = days
      this.month = months
    },
    async getNews () {
      showToast('加载数据中', 'loading')
      const res = await get('/weapp/getbnewhistory', {
        day: this.day,
        month: this.month
      })
      //   console.log(res);
      this.newsMsg = res.data.result
    }
  }
}
</script>

<style lang="less">
    .todayInHistory{
        .fix{
            zoom: 1;
        }
        .fix::after{
            display: block;
            content: 'clear';
            height: 0;
            clear: both;
            overflow: hidden;
            visibility: hidden;
        }
        .content{
            width:93%;
            height: auto;
            border-bottom:1px dashed rgb(163, 146, 146);;
            margin:20rpx auto;
            padding: 0rpx 10rpx;
            position:relative;
            .img{
                width:180rpx;
                height: 220rpx;
                float: left;
                img{
                    width:100%;;
                    height: 100%;
                }
            }
            .rightContent{
                width:500rpx;
                height: auto;
                float: right;
                p.title{
                    color:#009999;
                    font-weight: bold;
                    font-size: 35rpx;
                }
                p.date{
                    color:tomato;
                    font-size: 32rpx;
                }
                p.des{
                    color:rgb(163, 146, 146);
                    font-size: 30rpx;
                }
                p.lunar{
                    color:tomato;
                    font-size: 32rpx;
                }
            }
        }
    }
</style>


