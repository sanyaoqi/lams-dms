<template>
  <div style="margin: 5px; width: 100%; height: 100%;">
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title" style="color: #333">
        {{ repair.description }} &nbsp;
        <a class="device-repair-status"
           v-bind:class="{
           'textRed': this.repair.status == 0,
           'textOrange': this.repair.status == 1,
           'textBlue': this.repair.status == 2,
           'textGreen': this.repair.status == 3,
           'textGray': this.repair.status == 4
           }">
          &nbsp;{{ this.repair.status_name }}&nbsp;
        </a>
      </div>
      <div class="weui-media-box__desc" style="margin-top: 5px;" >
        <a>报修人：{{ this.repair.user.user_nick }}</a>
        <a style="position: absolute; left: 40%;">时间：{{ this.repair.created_at_format }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeviceRepairItem',
    props: {
      repair: Object
    }
  }
</script>

<style scoped>
  .device-repair-status {
    width: 100%;
    height: 100%;
    /*background-color: aquamarine;*/
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 2px;
  }
  .textRed {
    background-color: tomato;
  }
  .textOrange {
    background-color: gold;
  }
  .textBlue {
    background-color: deepskyblue;
  }
  .textGreen {
    background-color: mediumspringgreen;
  }
</style>
