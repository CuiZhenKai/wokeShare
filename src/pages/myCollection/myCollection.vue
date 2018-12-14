<template>
    <div class="MyCollection">
        <subTitle :data='myLoved'></subTitle>
        <!-- {{myLovedMsg[1].datas}} -->
        <Love v-for="item in myLovedMsg" :key="item.id" :skillItem='item'></Love>
    </div>
</template>


<script>
import subTitle from '@/components/subTitle'
import {get} from '@/utils/request.js'
import Love from '@/components/Love'
export default {
  components: {
    subTitle,
    Love
  },
  data () {
    return {
      myLoved: '我的收藏',
      userMsg: {},
      myLovedMsg: []
    }
  },
  created () {
    this.getUserMsg()
    this.getMyLoveMsg()
    // console.log(this.myLovedMsg);
  },
  methods: {
    getUserMsg () {
      let userMsgMe = wx.getStorageSync('userInfo')
      this.userMsg = userMsgMe
    },
    async getMyLoveMsg () {
      const res = await get('/weapp/getmylovemsg', {
        openid: this.userMsg.openId
      })
      if (res.code === '1') {
        this.myLovedMsg = res.data
      }
    }
  }
}
</script>


<style lang="less">

</style>
