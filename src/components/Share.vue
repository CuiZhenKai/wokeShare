<template>
    <div class="Card">
        <!-- 需要显示的内容:头像 昵称 技能概述 薪金 标签 微信号 -->
            <div class="avatarAndNumber">
                <div class="avatar">
                    <img :src="skillItem.avatarUrl" alt="">
                </div>
                <span class="right">
                    <p>{{skillItem.nickName}}</p>
                    <p>微信号:{{skillItem.weChatNum}}</p>
                </span>
            </div>
            <div class="skillIntro">
                <p class="intro">简介:{{skillItem.skillIntro}}</p>
                <p class="salary">心仪薪金:{{skillItem.skillSalary}}</p>
                <p class="tag">分类:<span class="verify">{{skillItem.tag}}</span></p>
            </div>
    </div>
</template>


<script>
import {post} from '@/utils/request.js'
import {showToast} from '@/utils/animation.js'
export default {
  props: ['skillItem'],
  data () {
    return {
      userMsg: {},
      ifLove: false
    }
  },
  created () {
    // console.log(this.skillItem);
    this.getUserMsg()
  },
  methods: {
    async love (e) {
      if (!this.ifLove) {
        // console.log("收藏");
        let target = e.mp._relatedInfo.anchorRelatedText
        let myLoveMsg = target.substr(0, target.length - 4)
        // console.log(myLoveMsg);
        const res = await post('/weapp/love', {
          openid: this.userMsg.openId,
          datas: myLoveMsg
        })
        if (res.code === '1') {
          wx.showModal({
            title: '蜗壳分享',
            content: '收藏成功,你可以在我的>我的收藏查看.',
            showCancel: false,
            confirmText: '朕知道了',
            confirmColor: '#009999'
          })
        }
        this.ifLove = true
      } else {
        showToast('不可以重复收藏')
      }
    },
    getUserMsg () {
      const userMsg = wx.getStorageSync('userInfo')
      // console.log(userMsg);
      this.userMsg = userMsg
    }
  }
}
</script>


<style lang="less" scoped>
    .Card{
        width:94%;
            height: auto;
            overflow: hidden;
            border:1rpx solid #009999;
            margin:30rpx auto;
            border-radius: 3%;
        .avatarAndNumber{
            width: 100%;
            height: 150rpx;
            padding:20rpx 20rpx;
            display: block;
            border-bottom:1rpx dashed rgb(145, 141, 141);
            .avatar{
                width:150rpx;
                height: 150rpx;
                float: left;
                img{
                    width:100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            span.right{
                float: left;
                margin-left:20rpx;
                margin-top:30rpx;
                :first-child{
                    color:#009999;
                    font-size:40rpx;
                    font-weight: bold;
                }
                :last-child{
                    color:rgb(73, 71, 71);
                    font-size:35rpx;
                }
            }
        }
        .skillIntro{
            width: 100%;
            height: auto;
            text-align: left;
            padding:20rpx 20rpx;
            p.intro{
                color:rgb(73, 71, 71);
                font-size: 35rpx;
                margin-right: 20rpx;
            }
            p.salary{
                color:tomato;
                font-size: 38rpx;
                font-weight: bold;
            }
            p.tag{
                color:tomato;
                font-size: 32rpx;
                font-weight: bold;
                .verify{
                    color:#009999;
                }
            }
        }
        .bottom{
            text-align: center;
            width:100%;
            height: 50rpx;
            padding: 20rpx 0;
        }
        .alreadylove{
            text-align: center;
            width:100%;
            height: 50rpx;
            padding: 20rpx 0;
            color:red;
            font-size: 35rpx;
        }
    }
</style>
