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
    if (!this.$store.state.configFlag) {
      this.axios
        .get(api.jssign + '?url=' + SIGNURL)
        .then(response => {
          console.log(response)
          //  测试用***\\\
          this.$store.commit('setConfigFlag')
          //  测试用***///
          this.json.time_stamp = response.data.data.timestamp
          this.json.noncestr = response.data.data.nonce_str
          this.json.signature = response.data.data.signature
          this.$wechat.config({
            beta: true,
            debug: false,
            appId: 'wwa417d520fd30a759',
            timestamp: this.json.time_stamp,
            nonceStr: this.json.noncestr,
            signature: this.json.signature,
            jsApiList: ['scanQRCode', 'getLocalImgData', 'chooseImage']
          })
          this.$wechat.ready(() => {
            this.$store.commit('setConfigFlag')
            alert('$wechat config ok')
          })
          this.$wechat.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            alert('$wechat config error')
          })
        })
    }
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
