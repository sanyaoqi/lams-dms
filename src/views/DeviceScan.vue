<template>
  <button @click="clickTest">测试扫一扫</button>
</template>

<script>
  import api from '@/api'
  const SIGNURL = 'http://device.olfu.xyz/device-scan'
  // const REDIRECT_URI = encodeURIComponent(SIGNURL)

  export default {
    name: 'device-scan',
    methods: {
      clickTest () {
      }
    },
    mounted () {
      this.axios
        .get(api.jssign + '?url=' + SIGNURL)
        .then(response => {
          // console.log(response)
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
          this.$wechat.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            this.$wechat.scanQRCode({
              desc: 'scanQRCode desc',
              needResult: 1,
              scanType: ['qrCode', 'barCode'],
              success: function (res) {
                // console.log(res)
                window.location.href = res.resultStr
              },
              error: function (res) {
                if (res.errMsg.indexOf('function_not_exist') > 0) {
                  alert('版本过低请升级')
                }
              }
            })
          })
        })
    },
    data () {
      return {
        flag: true,
        json: {}
      }
    }
  }
</script>

<style type="text/css" lang="less">

</style>

<style scoped>
</style>
