<template>
  <div style="margin: 5px; width: 100%; height: 100%;">
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title" style="color: #333">
        {{ this.maintain.name }}
        <rater v-model="data3"></rater>
      </div>
      <div class="weui-media-box__desc" style="margin-top: 5px;">
        <a>报修人：{{ this.maintain.name }}</a>
        <a style="position: absolute; left: 40%;">时间：{{ this.maintain.starts }}</a>
      </div>
    </div>
  </div>
</template>

import { Rater } from 'vux'

<script>
  export default {
    name: 'DeviceMaintainList',
    props: {
      maintain: Object
    },
    data () {
      return {
        data3: '5'
      }
    }
  }
</script>

<style scoped>

</style>
