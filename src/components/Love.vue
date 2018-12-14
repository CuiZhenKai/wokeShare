<template>
    <div class="Card">
        <!-- 需要显示的内容:头像 昵称 技能概述 薪金 标签 微信号 -->
            <div class="skillIntro">
                昵称:{{skillItem.datas}}
            </div>
    </div>
</template>


<script>
export default {
  props: ['skillItem'],
  data () {
    return {
      userMsg: {}
    }
  },
  created () {
    // console.log(this.skillItem);
    this.getUserMsg()
  },
  methods: {
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
