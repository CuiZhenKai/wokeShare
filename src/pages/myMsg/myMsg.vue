<template>
    <div class="myMsg">
        <div class="avatarAndnickName">
            <div class="avatar">
                <img :src="myMsg.avatarUrl" alt="" />
            </div>
            <p>{{myMsg.nickName}}</p>
        </div>
        <div class="detailMsg">
            <span class="left">姓别</span>
            <span class="right">{{myMsg.gender===1?'小哥哥':'小姐姐'||'保密'}}</span>
        </div>
        <div class="detailMsg">
            <span class="left">语言</span>
            <span class="right">{{myMsg.language==='zh_CN'?'简体中文':'英文或其他'}}</span>
        </div>
        &nbsp;
        <div class="detailMsg">
            <span class="left">国家</span>
            <span class="right">{{myMsg.country||'暂无'}}</span>
        </div>
        <div class="detailMsg">
            <span class="left">省份</span>
            <span class="right">{{myMsg.province||'暂无'}}</span>
        </div>
        <div class="detailMsg">
            <span class="left">城市</span>
            <span class="right">{{myMsg.city||'暂无'}}</span>
        </div>
    </div>
</template>


<script>
import {showToast} from '@/utils/animation.js'
export default {
  data () {
    return {
      myMsg: {}
    }
  },
  created () {
    this.getMyMsg()
    // console.log(this.myMsg);
  },
  methods: {
    getMyMsg () {
      try {
        const myMsg = wx.getStorageSync('userInfo')
        this.myMsg = myMsg
        // console.log(this.myMsg)
      } catch (error) {
        showToast(`获取信息失败${error.message}`, 'none')
      }
    }
  }
}
</script>


<style lang="less" scoped>
    .myMsg{
        background:#eee;
        width:100%;
        height: auto;
        background-size: 100% 100%;
        .avatarAndnickName{
            width: 100%;
            height: auto;
            background:#eee;
            text-align: center;
            padding: 40rpx 0;
            .avatar{
                width:175rpx;
                height: 175rpx;
                margin:0 auto;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            p{
                margin-top:20rpx;
                font-weight: bold;
            }
        }
        .detailMsg{
            width:100%;
            height: 100rpx;
            border-bottom:1rpx solid #ccc;
            line-height: 100rpx;
            background:white;
            span.left{
                float: left;
                margin-left:20rpx;
            }
            span.right{
                float: right;
                margin-right:20rpx;
            }
        }
    }
</style>
