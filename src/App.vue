<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/api'
const SIGNURL = 'http://device.olfu.xyz/device-scan'

export default {
  name: 'app',
  mounted () {
    this.axios
      .get(api.jssign + '?url=' + SIGNURL)
      .then(response => {
        console.log(response)
        this.json.time_stamp = response.data.data.timestamp
        this.json.noncestr = response.data.data.nonce_str
        this.json.signature = response.data.data.signature
        this.$wechat.config({
          beta: true,
          debug: true,
          appId: 'wwa417d520fd30a759',
          timestamp: this.json.time_stamp,
          nonceStr: this.json.noncestr,
          signature: this.json.signature,
          jsApiList: ['scanQRCode']
        })
        this.$wechat.ready(() => {
          this.$store.commit('setConfigFlag')
        })
      })
  },
  data () {
    return {
      json: {}
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  z-index: 1;
}
</style>
