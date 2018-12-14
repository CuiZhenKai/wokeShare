<template>
    <div class="commit">
        <!-- 技能概述 心仪佣金 联系方式 微信号 -->
        <form class="form">
            <p>请输入技能概述</p>
            <textarea placeholder="技能概述" class="textarea" maxlength="50" autofocus placeholder-class="placeholderClass" v-model="skillIntro"></textarea>
            <p>请输入心仪的佣金</p>
            <input type="text" class="input" placeholder="请输入心仪的佣金" placeholder-class="placeholderClass" v-model="skillSalary"/>
            <p>请输入微信号</p>
            <input type="text" class="input" placeholder="请输入您的微信号" placeholder-class="placeholderClass" v-model="weChatNum" />
            <p>请选择技能标签</p>
            <picker @change="chooseTag"  :value="index"  :range="array">
                <p>当前选择:<span>{{array[index]}}</span></p>
            </picker>
            <button class="btnShare" plain hover-class="btnShareHover" @click="shareSkill">分享技能</button>
        </form>
    </div>
</template>

<script>
import {showToast} from '@/utils/animation.js'
import {post} from '@/utils/request.js'
export default {
  data () {
    return {
      array: ['点击选择', '软件编程', '文娱体育', '日常生活', '计算机基础', '其他'],
      index: 0,
      skillIntro: '',
      skillSalary: '',
      weChatNum: '',
      tag: '',
      userMsg: {}
    }
  },
  created () {
    this.getUseMsg()
  },
  methods: {
    chooseTag (e) {
      // console.log(e);
      this.index = e.target.value
      this.tag = this.array[this.index]
    },
    getUseMsg () {
      let userMsgMe = wx.getStorageSync('userInfo')
      this.userMsg = userMsgMe
    },
    async shareSkill () {
      if (!this.skillIntro || !this.skillSalary || !this.weChatNum) {
        showToast('内容不能为空', 'none')
      } else {
        const res = await post('/weapp/commitSkill', {
          openid: this.userMsg.openId,
          nickName: this.userMsg.nickName,
          skillIntro: this.skillIntro,
          skillSalary: this.skillSalary,
          weChatNum: this.weChatNum,
          tag: this.tag,
          avatarUrl: this.userMsg.avatarUrl
        })
        // console.log(res);
        if (res.code === '1') {
          wx.showToast('发布成功', 'success')
          this.skillIntro = ''
          this.skillSalary = ''
          this.weChatNum = ''
        }
      }
    }
  }
}
</script>


<style lang="less">
    .commit{
        width: 100%;
        height: 100%;
        .form{
            p{
                margin-top:20rpx;
                margin-left:40rpx;
                font-size: 35rpx;
                font-weight: bold;
                color:#009999;
                span{
                    color:#666;
                }
            }
            .textarea{
                width: 650rpx;
                height: 200rpx;
                border: 2px dashed #009999;
                border-radius: 5%;
                margin-left:40rpx;
            }
            .input{
                width: 650rpx;
                height: 100rpx;
                border: 2px dashed #009999;
                border-radius: 5%;
                margin-left:40rpx;
            }
            .placeholderClass{
                font-size:30rpx;
            }
            .btnShare{
                color:white;
                width:650rpx;
                margin:50rpx auto;
                background:#009999;
                border:none;
            }
            .btnShareHover{
                border:1px solid #009999;
                background:white;
                color:#009999;
            }
        }
    }
</style>

