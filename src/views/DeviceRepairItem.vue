<template>
  <div style="margin: 5px; width: 100%; height: 100%;">
    <div class="weui-media-box__bd">
      <div class="weui-media-box__title" style="color: #333">
        {{ repair.name }} &nbsp;
        <a class="device-repair-status">已完成</a>
      </div>
      <div class="weui-media-box__desc" style="margin-top: 5px;">
        <a>报修人：{{ this.repair.name }}</a>
        <a style="position: absolute; left: 40%;">时间：{{ this.repair.name }}</a>
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
    background-color: aquamarine;
    font-size: 0.9rem;
  }
</style>
