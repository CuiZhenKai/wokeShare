<template>
  <div class="MeContainer">
    <div class="showMsg">
      <div class="intro fix">
          <div class="avatar">
            <img :src="userMsg.avatarUrl" alt="" @click.stop="preview">
          </div>
          <div class="detail">
            <span class="nickName">{{userMsg.nickName}}</span>
            &nbsp;
            <span class="country">{{userMsg.country}}</span>
            <p>{{meeting}}</p>
          </div>
      </div>
      <div class="sign" v-if="showLogin">
        <div class="button">
          <button size="mini" plain class="btn" hover-class="hoverBtn" @click="sign">签到</button>
        </div>
        <div class="signMsg">
          <p>已经连续签到{{signs}}天</p>
          <p>明天请坚持继续签到</p>
        </div>
      </div>
    </div>
    <div class="showButton" v-if="showLogin">
      <!--  -->
      <!-- 关于蜗壳分享 意见反馈 我的分享 我的收藏 -->
      <span @click="myMsg"><icon type="success" size="30rpx" color="#009999" ></icon>&nbsp;&nbsp;&nbsp;&nbsp;个人资料</span>
      <span @click="myCollection"><icon type="waiting" size="30rpx" color="#009999" ></icon>&nbsp;&nbsp;&nbsp;&nbsp;我的收藏</span>
      <span @click="myShare"><icon type="download" size="30rpx" color="#009999"></icon>&nbsp;&nbsp;&nbsp;&nbsp;我的分享</span>
      <span @click="aboutUs"><icon type="info" size="30rpx" color="#009999"></icon>&nbsp;&nbsp;&nbsp;&nbsp;关于我们</span>
      <span @click="adviseUs"><icon type="warn" size="30rpx" color="#009999"></icon>&nbsp;&nbsp;&nbsp;&nbsp;意见反馈</span>
    </div>
    <button open-type="getUserInfo" type="warn" v-if="!showLogin" lang="zh_CN" @getuserinfo="doLogin" class="btnLogin" plain>登录</button>
  </div>
  
</template>

<script>
import {showToast} from '@/utils/animation.js'
import {get} from '@/utils/request.js'
// 导入qcloud,来处理用户的登录问题
import qcloud from 'wafer2-client-sdk'
// 导入配置项
import config from '../../config'
export default{
  data () {
    return {
      // 是否登录
      showLogin: false,
      // 用户信息
      userMsg: {},
      meeting: '',
      signs: '0',
      // 是否今天已经签过到
      onlyOneSign: false,
      // 设定签到的时间
      time: ''
    }
  },
  created () {
    this.getUserMsgFromStorage()
    this.showMeeting()
    this.getSignNumber()
  },
  methods: {
    // 登录
    doLogin () {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: (res) => {
          wx.setStorageSync('userInfo', res)
          showToast('登录初始化中..', 'loading', '../../static/img/loading1.gif')
          this.getUserMsgFromStorage()
        }
      })
    },
    // 获取本地存储
    getUserMsgFromStorage () {
      try {
        let userMsg = wx.getStorageSync('userInfo')
        if (userMsg) {
          this.userMsg = userMsg
          this.showLogin = true
        } else {
          this.userMsg = {
            avatarUrl: '../../../static/img/unlogin.png',
            nickName: '未登录',
            country: '未知地区'
          }
        }
      } catch (error) {
        console.log(`获取用户信息失败${error.message}`)
      }
    },
    // 打招呼
    showMeeting () {
      // console.log("打招呼");
      let meetDate = new Date()
      let hour = meetDate.getHours()
      // console.log(hour);
      if (hour >= 5 && hour < 8) {
        this.meeting = '早上好,记得吃早饭'
      } else if (hour >= 8 && hour < 12) {
        this.meeting = '上午好,记得适度休息'
      } else if (hour >= 12 && hour < 14) {
        this.meeting = '中午了,休息一下吧'
      } else if (hour >= 14 && hour < 19) {
        this.meeting = '下午要记得开心啊'
      } else if (hour >= 19 && hour < 23) {
        this.meeting = '晚上好,休息休息吧'
      } else {
        this.meeting = '夜深了,注意休息啊'
      }
    },
    async sign () {
      if (this.onlyOneSign) {
        // console.log("1");
        showToast('今天签过啦!', 'none')
        return
      }
      // console.log("签到");
      // 新人还未签过到
      if (this.signs === '0') {
        const res = await get('/weapp/sign', {
          openid: this.userMsg.openId,
          nickName: this.userMsg.nickName
        })
        // this.getSignNumber();
        // console.log(res);
        if (res.code === '1') {
          this.signs = '1'
          this.onlyOneSign = true
          this.time = (new Date()).getHours()
          showToast('第一次签到成功', 'success')
          // console.log(this.time);
        }
      } else {
        // console.log("1");
        // this.getSignNumber();
        // console.log(res);
        const res2 = await get('/weapp/sign', {
          openid: this.userMsg.openId,
          add: 'add'
        })
        // console.log(res2);
        if (res2.code === '0') {
          // console.log("1");
          this.signs = res2.counts
          this.getSignNumber()
          this.onlyOneSign = true
          this.time = (new Date()).getHours()
          showToast('签到成功', 'success')
        }
      }
    },
    async getSignNumber () {
      const res = await get('/weapp/sign', {
        openid: this.userMsg.openId
      })
      // console.log(res);
      if (res.code === '-1') {
        this.signs = '0'
      } else {
        // console.log(res);
        this.signs = res.counts
      }
    },
    changeSignStatus () {
      if (this.onlyOneSign) {
        let nowTime = (new Date()).getHours()
        if (Math.abs(parseInt(nowTime - this.time)) >= 12) {
          this.time = false
        }
      }
    },
    myMsg () {
      // console.log("个人资料");
      wx.navigateTo({
        url: '/pages/myMsg/main'
      })
    },
    myCollection () {
      // console.log("我的收藏");
      wx.navigateTo({
        url: '/pages/myCollection/main'
      })
    },
    myShare () {
      // console.log("我的分享");
      wx.navigateTo({
        url: '/pages/myShare/main'
      })
    },
    aboutUs () {
      // console.log("关于我们");
      // wx.navigateTo({
      //   url: '/pages/aboutUs/main'
      // })
      wx.showModal({
        title: '关于蜗壳分享',
        content: '蜗壳分享是一个即时分享技能的校园平台,你可以将你的专长在这里换取一定的佣金.最终解释权以及所属均属开发者本人.欢迎你的使用,也欢迎提出建议帮助我们改进.',
        showCancel: false,
        confirmText: '朕知道了',
        confirmColor: '#009999'
      })
    },
    adviseUs () {
      // console.log("意见反馈");
      wx.navigateTo({
        url: '/pages/adviseUs/main'
      })
    },
    // 预览头像
    preview () {
      wx.previewImage({
        current: this.myMsg.avatarUrl, // 当前显示图片的http链接
        urls: [`${this.myMsg.avatarUrl}`]
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .MeContainer{
    .showMsg{
      width: 100%;
      height: auto;
      background: #009999;
      
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
      .intro{
        width:100%;
        height: auto;
        padding: 40rpx 40rpx;
        .avatar{
          width:150rpx;
          height: 150rpx;
          float: left;
          display: block;
          margin-left: 5%;
          img{
            width: 100%;
            height: 100%;
            border:7.5rpx solid white;
            border-radius: 50%;
          }
        }
        .detail{
          color:#fff;
          float:right;
          display: block;
          margin-right: 24%;
          margin-top:5%;
          font-size: 29rpx;
          span.nickName{
            font-weight: bold;
            font-size: 40rpx;
          }
          span.country{
            font-size: 30rpx;
          }
        }
      }
      .sign{
        margin-top: 12rpx;
        width: 100%;
        height: 60rpx;
        background:rgba(183, 231, 231, 0.3);
        padding: 40rpx 40rpx;
        .button{
          .hoverBtn{
            background:#009999;
            color:white;
          }
          .btn{
            border:1px solid #fff;
            color:white;
            float:left;
            margin-left: 5%;
          }
        }
        .signMsg{
            float: right;
            color:#fff;
            margin-right:30%;
            font-size: 30rpx;
        }
      }
    }
    .showButton{
      margin-top:20rpx;
      width:100%;
      height: auto;
      span{
        width:92%;
        height: 70rpx;
        border-bottom:1px solid #009999;
        display: block;
        margin-left: 4%;
        line-height: 70rpx;
        color:darkslategrey;
        font-size: 31rpx;
        font-weight: bold;
        margin-top:20rpx;
      }
    }
    .btnLogin{
      margin:100rpx auto;
      width: 90%;
    }
  }
</style>
