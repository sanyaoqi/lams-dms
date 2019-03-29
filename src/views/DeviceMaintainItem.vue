<template>
  <div style="margin: 5px; width: 100%; height: 100%;">
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title" style="color: #333">
        {{ this.maintain.name }} &nbsp;&nbsp;&nbsp;
        <a class="device-maintain-status"
           v-bind:class="{
           'textRed': this.maintain.status == 1,
           'textOrange': this.maintain.status == 2,
           'textGreen': this.maintain.status == 3,
           }">
          &nbsp;{{ this.maintain.status_name }}&nbsp;
        </a>
        <!-- <rater 
        v-model="maintain.starts" 
        :font-size="15" 
        v-if="maintain.starts && maintain.starts > 0">
        </rater> -->
      </div>
      <div class="weui-media-box__desc" style="margin-top: 5px;" v-if="this.maintain.user">
        <a >负责人：{{ this.maintain.user.user_nick }}</a>
        <a style="position: absolute; left: 40%;" v-if="this.maintain.status == 1">开始时间：{{ this.maintain.pre_end_time_format }}</a>
        <a style="position: absolute; left: 40%;" v-if="this.maintain.status == 3">完成时间：{{ this.maintain.end_time_format }}</a>
        <a style="position: absolute; left: 40%;" v-if="this.maintain.status == 2">取消时间：{{ this.maintain.end_time_format }}</a>
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
  .device-maintain-status {
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 2px;
    color: #fff;
  }
</style>
