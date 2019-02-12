<template>
  <router-link :to="'/deviceview/'+device.id" class="weui-media-box weui-media-box_appmsg">
    <div class="weui-media-box__hd" v-if="device.images">
      <img class="weui-media-box__thumb" :src="device.images" alt="">
    </div>
    <div class="weui-media-box__bd">
      <h4 class="weui-media-box__title" v-html="device.name"></h4>
      <p class="weui-media-box__desc" v-html="device.description"></p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'deviceitem',
  props: {
    device: Object
  }
}
</script>