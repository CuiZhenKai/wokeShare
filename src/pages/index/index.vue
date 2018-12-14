<template>
    <div class="index">
        <subTitle :data='showArea'></subTitle>
        <Card v-for="skillItem in skillListMsg" :key="skillItem.id" :skillItem="skillItem"></Card>
        <p class="text-footer" v-if="!more">我是有底线的</p>
    </div>
</template>


<script>
import Card from '@/components/Card'
import subTitle from '@/components/subTitle'
import {get} from '@/utils/request.js'
export default {
  components: {
    Card,
    subTitle
  },
  data () {
    return {
      skillListMsg: [],
      more: true,
      page: 0,
      showArea: '技能展览区'
    }
  },
  created () {
    this.getSkillList(true)
    // console.log(this.skillListMsg);
  },
  methods: {
    async getSkillList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const res = await get('/weapp/getSkill', {page: this.page})
      // console.log(res.data);
      // this.skillListMsg = res.data;

      if (this.skillListMsg.length < 3 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.skillListMsg = res.data
        wx.stopPullDownRefresh()
      } else {
        // console.log(res.data);
        this.skillListMsg = this.skillListMsg.concat(res.data)
      }
      wx.hideNavigationBarLoading()
      // console.log(this.skillListMsg);
    }
  },
  onPullDownRefresh () {
    // console.log("1");
    this.getSkillList(true)
  },
  onReachBottom () {
    if (!this.more) {
      // 没有更多
      this.more = false
      return
    }
    this.page = this.page + 1
    this.getSkillList()
  }
}
</script>


<style lang="less" scoped>
    .index{
        .text-footer{
            width: 100%;
            height: 40rpx;
            text-align: center;
            color:#009999;
            font-weight: bold;
            font-size: 30rpx;
        }
    }
</style>
