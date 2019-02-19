<template>
  <div style="margin: 5px; width: 100%; height: 100%;">
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title" style="color: #333">
        {{ this.maintain.name }} &nbsp;&nbsp;&nbsp;
        <rater v-model="maintain.starts" :font-size="15"></rater>
      </div>
      <div class="weui-media-box__desc" style="margin-top: 5px;">
        <a>处理人：{{ this.maintain.name }}</a>
        <a style="position: absolute; left: 40%;">时间：{{ this.maintain.starts }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { Rater } from 'vux'

  export default {
    name: 'DeviceMaintainList',
    components: {
      Rater
    },
    props: {
      maintain: Object
    }
  }
</script>

<style scoped>

</style>
