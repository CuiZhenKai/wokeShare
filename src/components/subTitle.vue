<template>
    <div class="sub-title">·{{data}}·</div>
</template>


<script>
export default {
  props: ['data']
}
</script>


<style lang="less" scoped>
    .sub-title{
        width:100%;
        height: 40rpx;
        padding:10rpx 10rpx;
        text-align: center;
        margin-top: 20rpx;
        color:tomato;
        font-weight: bold;
        font-size: 35rpx;
    }
</style>
