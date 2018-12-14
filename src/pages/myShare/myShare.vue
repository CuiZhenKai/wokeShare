<template>
    <div class="MyShare">
        <subTitle :data='myShared'></subTitle>
        <Share v-for="myShareItem in myShareDetailMsg" :key="myShareItem.id" :skillItem='myShareItem'></Share>
    </div>
</template>


<script>
import subTitle from '@/components/subTitle'
import Share from '@/components/Share'
import {get} from '@/utils/request.js'
export default {
  components: {
    subTitle,
    Share
  },
  data () {
    return {
      myShared: '我分享的',
      userMsg: {},
      myShareDetailMsg: []
    }
  },
  created () {
    this.getUserMsg()
    // console.log(this.userMsg);
    this.getMyShareMsg()
    // console.log(this.myShareDetailMsg);
  },
  methods: {
    getUserMsg () {
      let userMsgMe = wx.getStorageSync('userInfo')
      this.userMsg = userMsgMe
    },
    async getMyShareMsg () {
      // console.log("1");
      // console.log(userMsg.openId);
      const res = await get('/weapp/getmyshare', {
        openid: this.userMsg.openId
      })
      // console.log(res.data);
      if (res.code === '1') {
        this.myShareDetailMsg = res.data
      }
    }
  }
}
</script>


<style lang="less">

</style>
