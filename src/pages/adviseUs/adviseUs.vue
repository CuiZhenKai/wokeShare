<template>
    <div class="adviseUs">
        <textarea class="textarea" placeholder="请输入您的意见或建议,采取后您会得到一定的奖励.最大不要超过120个字,你的意见或者建议使我们成长的动力" maxlength="120" auto-focus v-model="adviseMe"></textarea>
        <button @click="advise" lang="zh_CN" class="btnSubmit" hover-class="btnSubmitHover">提交</button>
        <button lang="zh_CN" class="btnContact" hover-class="btnContactHover" open-type="contact">联系客服</button>
    </div>
</template>


<script>
import {post} from '@/utils/request.js'
import {showToast} from '@/utils/animation.js'
export default {
  data () {
    return {
      adviseMe: '',
      userMsg: {}
    }
  },
  created () {
    this.getUserMsg()
  },
  methods: {
    async advise () {
      // console.log("1");
      if (!this.adviseMe) {
        showToast('意见内容不允许为空', 'none')
      } else {
        const res = await post('/weapp/adviseUs', {
          openid: this.userMsg.openId,
          advises: this.adviseMe
        })
        // console.log(res);
        if (res.code === '1') {
          wx.showModal({
            title: '蜗壳分享',
            content: '十分感谢您的反馈,如果您的意见被采纳,我们会在第一时间对您进行奖励.',
            showCancel: false,
            confirmText: '朕知道了',
            confirmColor: '#009999'
          })
          this.adviseMe = ''
        }
      }
    },
    getUserMsg () {
      let userMsgMe = wx.getStorageSync('userInfo')
      this.userMsg = userMsgMe
    }
  }
}
</script>


<style lang="less" scoped>
    .adviseUs{
        // border:1px solid #000;
        width: 100%;
        height: auto;
        .textarea{
            width:650rpx;
            height: 600rpx;
            border:1px solid #009999;
            margin:20rpx auto;
            display:block;
            border-radius: 8%;
            padding:30rpx 30rpx;
        }
        .btnSubmit{
            width:700rpx;
            margin:20rpx auto;
            border:none;
            background:#009999;
            color:#ffffff;
        }
        .btnSubmitHover{
            background:#ffffff;
            color:#009999;
        }
        .btnContact{
            width:700rpx;
            margin:20rpx auto;
            border:none;
            background:#ffffff;
            color:#009999;
        }
        .btnContactHover{
            background:#009999;
            color:#ffffff;
        }
    }
</style>
